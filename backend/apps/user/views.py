from itertools import dropwhile, chain

from operator import mul, attrgetter, __not__

from apps.user.managers import AFSUserManager

from apps.common.exception import JSONException
from apps.lookup.models import LKUPEventType
from django.db.models.query import EmptyQuerySet, REPR_OUTPUT_SIZE
from ..recommend_engine.config import LC_WEIGHTS, LC_SORT_ORDERS
from ..recommend_engine.engine import SimilarRecommendationEngine
from django.db.models import Q, CharField, Max
from rest_framework.authentication import SessionAuthentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny
import datetime
from dateutil.relativedelta import relativedelta
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import AFSUser, UserConnect, AccountActivation
from .serializers import AFSUserSerializer, UserConnectSerializer, DetailAFSUserSerializer, StorySerializer, \
    UserRecommendedSerializer
from apps.events.models import Event
from apps.events.serializers import EventSerializer
from apps.news.models import News
from apps.news.serializers import NewsSerializer
from apps.common.pagination import BasePagination
from apps.common.mangers.response import construct_response
from apps.common.constants import ERR_GENERAL, ERR_INVALID_PARAMETER, ERR_OBJ_NOT_EXIST, CODE_SUCCESS, ERR_NO_REQUEST_USER
from django.core.cache import cache

class Temp():
    pass

class AFSUserViewSet(ModelViewSet):
    """
    API endpoint that allows AFSUSER to be viewed or edited.
    """
    queryset = AFSUser.objects.all().filter(user__account_activation_user__status=AccountActivation.STATUS_APPROVED).exclude(user__is_superuser=True)
    serializer_class = AFSUserSerializer
    authentication_classes = [JSONWebTokenAuthentication]
    pagination_class = BasePagination

    def get_queryset(self):
        return self.queryset

    def list(self, request):
        params = request.query_params
        use_pagination = True
        if params.get("no_page"):
            use_pagination = False
        query_set = self.get_queryset()
        user = request.user
        filters = {}
        or_filter = Q()
        serializer = DetailAFSUserSerializer
        afsUser = AFSUser.objects.get(user=user)

        company_type = params.get("company_type")
        company_name = params.get("company_name")
        user_name = params.get("user_name")
        if company_type:
            filters["company__company_type"] = company_type

        if company_name:
            filters["company__name__icontains"] = company_name
        if user_name and user_name != 'undefined':
            or_filter = Q(user__first_name__icontains=user_name) | Q(
                user__last_name__icontains=user_name)

        if params.get("list_type"):
            serializer = UserConnectSerializer
            list_type = params.get("list_type")
            if list_type == "my_connections":
                the_filters = {}
                if company_type:
                    or_filter = (Q(acceptor_company__company_type__icontains=company_type) \
                                 & Q(requester_company=afsUser.company))            \
                            | (Q(requester_company__company_type__icontains=company_type) \
                               & Q(acceptor_company=afsUser.company))
                if company_name:
                    or_filter = Q(acceptor_company__name__icontains=company_name) \
                                 | Q(requester_company__name__icontains=company_name)
                if user_name:
                    or_filter = Q((Q(acceptor__user__first_name__icontains=user_name) | Q(acceptor__user__last_name__icontains=user_name)) & Q(requester__user=user)) \
                            | Q((Q(requester__user__first_name__icontains=user_name) |Q(requester__user__last_name__icontains=user_name)) & Q(acceptor__user=user))
                query_set = afsUser.get_connections(or_filter, **the_filters)
            if list_type == "pending_connections":
                the_filters = {}
                if company_type:
                    the_filters["acceptor__company__company_type"] = company_type
                if company_name:
                    the_filters["acceptor__company__name__icontains"] = company_name
                query_set = afsUser.get_pending_connections(or_filter, **the_filters)
            if list_type == "all_connections":
                query_set = query_set.filter(or_filter, **filters).exclude(user=user)
                query_set = query_set.order_by("-user__date_joined")
                group_dict = query_set.values('company_id').annotate(max_user=Max('user_id')).order_by()

                params = Q()
                for obj in group_dict:
                    params |= (Q(company_id__exact=obj['company_id']) & Q(user_id=obj['max_user']))
                query_set = query_set.filter(params)
                query_set_c = []
                for item in query_set:
                    conn_object = Temp()
                    conn_object.user = item
                    conn_object.company = item.company
                    query_set_c.append(conn_object)
                query_set = query_set_c
                serializer = UserRecommendedSerializer
            if list_type == "listed_companies":
                query_set = query_set.filter(**filters)
                query_set = query_set.order_by("-user__last_login")

                query_set_c = []
                for item in query_set:
                    conn_object = Temp()
                    conn_object.user = item
                    conn_object.company = item.company
                    query_set_c.append(conn_object)
                query_set = query_set_c
                serializer = UserRecommendedSerializer
            if list_type == "recommended_connections":
                """
                1. Sub Industry
                2. Industry
                3. Company Size (LC) / Investment Size (FM)
                4. Countries of Operations (LC) / Location of Company HQ (FM)
                5. Number of views
                6. Newly added LC / FM
                """

                cached_conns = cache.get('conns_cache_' + str(user.id) + '_' + str(filters))
                serializer = UserRecommendedSerializer
                if cached_conns:
                    query_set = cached_conns
                else:
                    # connections_id = [afs.user for afs in afsUser.get_connections()]
                    connections_id = afsUser.get_connection_users()
                    pending_connections_id = afsUser.get_requesting_connection_users()


                    query_set = query_set.filter(company__isnull=False).exclude(user__in=connections_id) \
                            .exclude(user__in=pending_connections_id)\
                                .exclude(user=user).exclude(company__company_type=afsUser.get_company_type())
                    # Lay 1 thang 1 company
                    group_dict = query_set.values('company_id').annotate(max_user=Max('user_id')).order_by()

                    params = Q()
                    for obj in group_dict:
                        params |= (Q(company_id__exact=obj['company_id']) & Q(user_id=obj['max_user']))
                    query_set = query_set.filter(params)
                    weight_rules = LC_WEIGHTS
                    rec_engine = SimilarRecommendationEngine(afsUser,query_set,weight_rules,LC_SORT_ORDERS)
                    engine_result = rec_engine.compute()
                    #todo inject company info into
                    query_set = []
                    for item in engine_result:
                        conn_object = Temp()
                        conn_object.user = item
                        conn_object.company = item.company
                        query_set.append(conn_object)

                    cache.set('conns_cache_' + str(user.id) + '_' + str(filters), query_set, 3600)
        if use_pagination:
            page = self.paginate_queryset(query_set)
            if page is not None:
                data = serializer(page, many=True,context={'request': request}).data
                return self.get_paginated_response(data)
        return construct_response(CODE_SUCCESS, serializer(query_set,context={'request': request}, many=True).data)

    def create(self, request):
        data = request.data
        try:
            afs_user = AFSUserManager.create_afs_user(user=request.user,**data)
            # if isinstance(afs_user,dict) and afs_user.get("error"):
            #     return construct_response(ERR_GENERAL)
            return construct_response(CODE_SUCCESS, self.get_serializer(afs_user).data)
        except JSONException as e:
            return construct_response(ERR_GENERAL, e.errors)

    def retrieve(self, request, pk=None, **kwargs):
        try:
            afsUser = self.get_queryset().get(user_id=pk)
            if request.user.id == int(pk):

                return construct_response(CODE_SUCCESS,
                                          DetailAFSUserSerializer(afsUser, many=False,context={'request': request}).data)
            afsUser.views_count += 1
            afsUser.save()
            return construct_response(CODE_SUCCESS, DetailAFSUserSerializer(afsUser,context={'request': request}, many=False).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL,"No user found")

    def put(self, request):
        data = request.data
        # uid = data.get('id')
        if request.user is None:
            code = ERR_NO_REQUEST_USER
            return construct_response(code)
        else:
            afs_user = AFSUserManager.edit_afs_user(user=request.user, **data)
            if isinstance(afs_user, dict) and afs_user.get("error"):
                return construct_response(ERR_GENERAL,afs_user.get("error"))
            return construct_response(CODE_SUCCESS, DetailAFSUserSerializer(afs_user,context={'request': request}).data)

    @list_route(methods=['get', ], permission_classes=[AllowAny])
    def all(self, request):
        params = request.query_params
        query_set = self.get_queryset()
        user = request.user
        filters = {}
        or_filter = Q()
        serializer = UserRecommendedSerializer

        company_type = params.get("company_type")

        if company_type:
            filters["company__company_type"] = company_type
        query_set = query_set.filter(or_filter, **filters)
        query_set = query_set.order_by("-user__date_joined")
        group_dict = query_set.values('company_id').annotate(max_user=Max('user_id')).order_by()

        params = Q()
        for obj in group_dict:
            params |= (Q(company_id__exact=obj['company_id']) & Q(user_id=obj['max_user']))
        query_set = query_set.filter(params)
        query_set_c = []
        for item in query_set:
            conn_object = Temp()
            conn_object.user = item
            conn_object.company = item.company
            query_set_c.append(conn_object)
        query_set = query_set_c

        page = self.paginate_queryset(query_set)
        if page is not None:
            data = serializer(page, many=True, context={'request': request}).data
            return self.get_paginated_response(data)
        return construct_response(CODE_SUCCESS, serializer(query_set, context={'request': request}, many=True).data)

    @list_route(methods=['post', ])
    def connect(self,request):
        data = request.data
        to_user_id = data.get("userid")
        to_company_id = data.get("to_company_id")

        from_user = AFSUser.objects.get(user=request.user)
        if to_user_id:
            to_user = AFSUser.objects.get(user__id=int(to_user_id))

            user_connect = AFSUserManager.connect(from_user,to_user,request)
        elif to_company_id:
            from apps.company.models import Company
            to_company = Company.objects.get(id=to_company_id)
            user_connect = AFSUserManager.connect_to_company(from_user, to_company,request)
            # from apps.company.serializers import CompanySerializer
            # self.serializer_class = CompanySerializer
        return construct_response(CODE_SUCCESS, UserConnectSerializer(user_connect,context={"request":request}).data)

    @list_route(methods=['post', ])
    def disconnect(self, request):
        data = request.data
        to_user_id = data.get("userid")
        to_company_id = data.get("to_company_id")

        from_user = AFSUser.objects.get(user=request.user)
        if to_user_id:
            to_user = AFSUser.objects.get(user__id=int(to_user_id))

            user_connect = AFSUserManager.disconnect(from_user, to_user)
        elif to_company_id:
            from apps.company.models import Company
            to_company = Company.objects.get(id=to_company_id)
            user_connect = AFSUserManager.disconnect_company(from_user, to_company)

        return construct_response(CODE_SUCCESS, UserConnectSerializer(user_connect,context={"request":request}).data)

    @list_route(methods=['post', ])
    def approve(self, request):
        data = request.data
        to_user = AFSUser.objects.get(user=request.user)

        user_approve = AFSUserManager.approve_request(to_user, data.get("requestid"),request)

        return construct_response(CODE_SUCCESS, UserConnectSerializer(user_approve,context={"request":request}).data)

    @list_route(methods=['post', ])
    def reject(self, request):
        data = request.data
        to_user = AFSUser.objects.get(user=request.user)

        user_approve = AFSUserManager.reject_request(to_user, data.get("requestid"))

        return construct_response(CODE_SUCCESS, UserConnectSerializer(user_approve,context={"request":request}).data)


    @list_route(methods=['get', ])
    def connections(self, request):
        query_set = AFSUser.objects.get(user=request.user).connects.all()
        page = self.paginate_queryset(query_set)
        if page is not None:
            return self.get_paginated_response(self.get_serializer(page, many=True).data)
        return construct_response(CODE_SUCCESS, self.get_serializer(query_set, many=True).data)

    @list_route(methods=['get', ])
    def dashboard(self, request):
        from itertools import chain
        from operator import attrgetter
        from queryset_sequence import QuerySetSequence
        from django.db.models import F,Value
        news_query_set = News.objects.filter(date_published__isnull=False,status='LIVE').annotate(item_type=Value("NEWS", output_field=CharField()))
        event_query_set = Event.objects.filter(date_published__isnull=False,status='LIVE').exclude(type__code__in=[LKUPEventType.EVENT_TYPE_MEETING,LKUPEventType.EVENT_TYPE_ONE_ON_ONE]).annotate(image=F('banner')).annotate(item_type=Value("EVENT", output_field=CharField()))
        combine_queryset = QuerySetSequence(news_query_set, event_query_set)
        # query_set = sorted(
        #     chain(news_query_set, event_query_set),
        #     key=attrgetter('date_published'), reverse=True)
        query_set = combine_queryset.order_by('-date_published').filter(date_published__lte=datetime.datetime.today())
        # query_set = sorted(
        #     combine_queryset,
        #     key=attrgetter('date_published'), reverse=True)
        # for a in query_set:
        #     print(str(a.date_published) + a.item_type)

        page = self.paginate_queryset(query_set)
        if page is not None:
            data = StorySerializer(page, many=True).data
            return self.get_paginated_response(data)
        return construct_response(CODE_SUCCESS, StorySerializer(list, many=True).data)


class UserEventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = BasePagination
    permission_classes = [AllowAny]

    def retrieve(self, request, pk=None, **kwargs):
        events = self.get_queryset().filter(user__id=pk)
        paras = request.query_params
        try:
            event_type = paras.get('type')
            if event_type:
                if event_type == 'draft':
                    events = events.filter(date_published__isnull=True)
                else:
                    now = datetime.datetime.now()
                    if event_type == 'latest':
                        one_month = now + relativedelta(months=1)
                        events = events.filter(date_end__gte=now, date_end__lte=one_month)
                    elif event_type == 'past':
                        events = events.filter(date_end__lt=now)
                    else:
                        return construct_response(ERR_INVALID_PARAMETER)
                    events = events.exclude(date_published__isnull=True)
            else:
                return construct_response(ERR_INVALID_PARAMETER)
            return construct_response(CODE_SUCCESS, self.get_serializer(events, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)

    @detail_route(methods=['GET'])
    def saved(self, request, pk):
        events = self.get_queryset()
        paras = request.query_params
        try:
            filters = {'followers__id': pk}
            country = paras.get('country')
            if country:
                filters['country__iso'] = country
            category = paras.get('category')
            if category:
                filters['industry__code'] = category
            event_type = paras.get('type')
            if event_type:
                now = datetime.datetime.now()
                if event_type == 'past':
                    filters['date_end__lt'] = now
                elif event_type == 'future':
                    filters['date_end__gt'] = now
            events = events.filter(**filters).exclude(date_published__isnull=True)
            order = paras.get('order_field')
            if order:
                if paras.get('order') == 'desc':
                    order = '-' + order
                events = events.order_by(order)
            page = self.paginate_queryset(events)
            if page is not None:
                return self.get_paginated_response(self.get_serializer(page, many=True).data)
            return construct_response(CODE_SUCCESS, self.get_serializer(events, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)

    @detail_route(methods=['GET'])
    def followed(self, request, pk):
        events = self.get_queryset()
        paras = request.query_params
        try:
            filters = {'user__afsuser__connects__user__id': pk}
            country = paras.get('country')
            if country:
                filters['country__iso'] = country
            category = paras.get('category')
            if category:
                filters['industry__code'] = category
            event_type = paras.get('type')
            if event_type:
                now = datetime.datetime.now()
                if event_type == 'past':
                    filters['date_end__lt'] = now
                elif event_type == 'future':
                    filters['date_end__gt'] = now
            events = events.filter(**filters).exclude(date_published__isnull=True)
            order = paras.get('order_field')
            if order:
                if paras.get('order') == 'desc':
                    order = '-' + order
                events = events.order_by(order)
            page = self.paginate_queryset(events)
            if page is not None:
                return self.get_paginated_response(self.get_serializer(page, many=True).data)
            return construct_response(CODE_SUCCESS, self.get_serializer(events, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)


class UserNewsViewSet(ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    pagination_class = BasePagination
    permission_classes = [AllowAny]

    def retrieve(self, request, pk=None, **kwargs):
        news = self.get_queryset().filter(user__id=pk)
        paras = request.query_params
        try:
            news_type = paras.get('type')
            if news_type:
                if news_type == 'draft':
                    news = news.filter(date_published__isnull=True)
                else:
                    now = datetime.datetime.now()+relativedelta(days=1)
                    seven_days = now + relativedelta(days=-8)
                    if news_type == 'latest':
                        news = news.filter(date_published__lte=now, date_end__gte=seven_days)
                    elif news_type == 'past':
                        news = news.filter(date_end__lt=seven_days)
                    else:
                        return construct_response(ERR_INVALID_PARAMETER)
                    news = news.exclude(date_published__isnull=True)
            else:
                return construct_response(ERR_INVALID_PARAMETER)
            return construct_response(CODE_SUCCESS, self.get_serializer(news, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)

    @detail_route(methods=['GET'])
    def saved(self, request, pk):
        news = self.get_queryset()
        paras = request.query_params
        try:
            filters = {'followers__id': pk}
            category = paras.get('category')
            if category:
                filters['industry__code'] = category
            news_type = paras.get('type')
            if news_type:
                now = datetime.datetime.now()
                if news_type == 'past':
                    filters['date_published__lt'] = now
                elif news_type == 'future':
                    filters['date_published__gt'] = now
            news = news.filter(**filters).exclude(date_published__isnull=True)
            order = paras.get('order_field')
            if order:
                if paras.get('order') == 'desc':
                    order = '-' + order
                news = news.order_by(order)
            page = self.paginate_queryset(news)
            if page is not None:
                return self.get_paginated_response(self.get_serializer(page, many=True).data)
            return construct_response(CODE_SUCCESS, self.get_serializer(news, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)

    @detail_route(methods=['GET'])
    def followed(self, request, pk):
        news = self.get_queryset()
        paras = request.query_params
        try:
            filters = {'user__afsuser__connects__user__id': pk}
            category = paras.get('category')
            if category:
                filters['industry__code'] = category
            news_type = paras.get('type')
            if news_type:
                now = datetime.datetime.now()
                if news_type == 'past':
                    filters['date_published__lt'] = now
                elif news_type == 'future':
                    filters['date_published__gt'] = now
            news = news.filter(**filters).exclude(date_published__isnull=True)
            order = paras.get('order_field')
            if order:
                if paras.get('order') == 'desc':
                    order = '-' + order
                news = news.order_by(order)
            page = self.paginate_queryset(news)
            if page is not None:
                return self.get_paginated_response(self.get_serializer(page, many=True).data)
            return construct_response(CODE_SUCCESS, self.get_serializer(news, many=True).data)
        except Exception as e:
            print(e)
            return construct_response(ERR_GENERAL)


def cmp(a, b):
    return (a > b) - (a < b)

