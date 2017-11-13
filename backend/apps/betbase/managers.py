"""
User API
"""
# from apps.company.managers import CompanyManager

from apps.common.constants import ERR_NOT_ALLOWED

from apps.common.exception import JSONException

from apps.lookup.models import LKUPLanguage

# from apps.notifications.signals import notify
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone
from .models import Bet, BetEvent
from django.utils.translation import gettext as _
from apps.common.mangers.email_manager import send_mail
from django.db import transaction
class BetManager(object):
    @staticmethod
    def filter(queryset, **filter_params):

        return queryset.filter(**filter_params)

    @staticmethod
    def create_afs_user(user=None, **data):
        if user is None:
            raise JSONException(ERR_NOT_ALLOWED, {"error": "No user"})
        error_list = []
        # try:
        if "company" in data.keys() and not data.get("company"):
            data.pop("company")
        if data.get("company"):
            company = CompanyManager.create_company(user=user, **data.pop("company"))
            # if isinstance(company,dict) and company.get("error"):
            #     error_list.append(company.get("error"))
            #     raise Exception(error_list)
            data["company"] = company

        afs_user = Bet.objects.create(user=user,**data)
        return afs_user
        # except Exception as e:
        #     raise JSONException("create_afs_user", {"error": str(e)})

    @staticmethod
    def edit_afs_user(user=None, **data):
        if user is None:
            return ERR_NOT_ALLOWED
        try:
            error_list = []
            if "company" in data.keys() and not data.get("company"):
                data.pop("company")
            if data.get("company"):
                company = CompanyManager.create_company(user=user,**data.pop("company"))
                data["company"] = company
            if data.get("language"):
                data["language"] = LKUPLanguage.objects.get(code=data.get("language"))
            user_data = {}
            user_data["first_name"] = data.pop("first_name")
            user_data["last_name"] = data.pop("last_name")
            user_data["email"] = data.pop("email")
            if User.objects.filter(email=user_data["email"]).exclude(id=user.id).exists():
                # return {"error": _("A user is already registered with this e-mail address.")}
                raise JSONException("field_errors",{"email": _("A user is already registered with this e-mail address.")})
            if user.email != user_data["email"]:#email change need to update account_emailaddress
                email_address = user.emailaddress_set.get(email=user.email)
                email_address.email = user_data["email"]
                email_address.save()
            user.__dict__.update(user_data)
            user.save()
            afs_user = Bet.objects.get(user=user)
            afs_user.language = data.get("language")
            afs_user.__dict__.update(**data)
            if not afs_user.company:
                afs_user.company = company
            afs_user.save()
            return afs_user
        except Bet.DoesNotExist:
            return {"error": "No user"}

    @transaction.atomic
    def connect(from_user, to_user,request,silent=False):
        host = request.get_host()
        from .serializers import BetEventReverseSerializer
        if from_user == to_user:
            return to_user
        from_user_company = from_user.company
        to_user_company = to_user.company
        user_connect = None
        actor = from_user

        if from_user.is_from_listed_company():
            actor = from_user_company
            request_check = BetEvent.objects.filter(requester_company=from_user_company, acceptor=to_user)
            if request_check.exists():
                user_connect = request_check.get()
                if user_connect.date_rejected:
                    user_connect.date_rejected = None
                    user_connect.save()

            acceptor_check = BetEvent.objects.filter(requester=to_user, acceptor_company=from_user_company)
            if acceptor_check.exists():
                acceptor_check.first().date_approved = timezone.now()
                acceptor_check.first().save()
                user_connect= acceptor_check.get()
        else:
            request_check = BetEvent.objects.filter(requester=from_user, acceptor=to_user)
            if request_check.exists():
                user_connect = request_check.get()
                if user_connect.date_rejected:
                    user_connect.date_rejected = None
                    user_connect.save()
            acceptor_check = BetEvent.objects.filter(requester=to_user, acceptor=from_user)
            if acceptor_check.exists():
                acceptor_check.first().date_approved = timezone.now()
                acceptor_check.first().save()
                user_connect =  acceptor_check.get()
        if not user_connect:
            user_connect = BetEvent.objects.create(requester=from_user,requester_company= from_user_company, acceptor=to_user, acceptor_company=to_user_company)
            to_user.save()
            profile_url = ("LC" if from_user.company.is_listed_company() else "FM")+"/"+ str(from_user.company.id) if from_user.company.is_listed_company() else str(from_user.user.id)
            if not silent:
                send_mail("connect/invitation", to_user.user.email,
                          {"REQUESTOR_FIRST_NAME": from_user.user.first_name + ' ' + from_user.user.last_name,
                           "REQUESTOR_DESIGNATION": from_user.role if from_user.role else "",
                           "REQUESTOR_COMPANY": from_user.company.name,
                           "USER": to_user.user.first_name + ' ' + to_user.user.last_name,
                           "LOGIN_URL": request.build_absolute_uri('/login'),
                           "PROFILE_LINK": request.build_absolute_uri("/private/connections/" + profile_url)}
                          )

        if not silent:
            notify.send(actor, recipient=to_user.user, target_object_id=str(from_user.user.id),

        verb = 'connection', description = from_user.user.first_name + ' sent you a request',connection= BetEventReverseSerializer(user_connect,many=False, context={"request":request}).data,
                                        profile_picture_url = from_user.profile_picture_url,company_type=from_user.get_company_type())
        return user_connect

    @transaction.atomic
    def connect_to_company(from_user, to_company,request,silent=False):
        host = request.get_host()
        from .serializers import BetEventReverseSerializer
        if from_user.company == to_company:
            return to_company
        from_user_company = from_user.company
        user_connect = None
        actor = from_user
        if not from_user.is_from_listed_company():
            request_check = BetEvent.objects.filter(requester=from_user, acceptor_company=to_company)
            if request_check.exists():
                user_connect = request_check.get()
                if user_connect.date_rejected:
                    user_connect.date_rejected = None
                    user_connect.save()

            acceptor_check = BetEvent.objects.filter(requester_company=to_company, acceptor=from_user)
            if acceptor_check.exists():
                acceptor_check.first().date_approved = timezone.now()
                acceptor_check.first().save()
                user_connect =  acceptor_check.get()
        else:
            actor = from_user_company
            request_check = BetEvent.objects.filter(requester_company=from_user.company, acceptor_company=to_company)
            if request_check.exists():
                user_connect = request_check.get()
                if user_connect.date_rejected:
                    user_connect.date_rejected = None
                    user_connect.save()
            acceptor_check = BetEvent.objects.filter(requester_company=to_company, acceptor_company=from_user.company)
            if acceptor_check.exists():
                acceptor_check.first().date_approved = timezone.now()
                acceptor_check.first().save()
                user_connect = acceptor_check.get()

        if not user_connect:
            user_connect = BetEvent.objects.create(requester=from_user, requester_company=from_user_company,
                                                      acceptor=Bet.objects.get(user=to_company.creator),
                                                      acceptor_company=to_company)
            to_company.save()
            profile_url = ("LC" if from_user.company.is_listed_company() else "FM") + "/" + str(
                from_user.company.id) if from_user.company.is_listed_company() else str(from_user.user.id)
            if not silent:
                send_mail("connect/invitation", to_company.creator.email,
                          {"REQUESTOR_FIRST_NAME": from_user.user.first_name + ' ' + from_user.user.last_name,
                           "REQUESTOR_DESIGNATION": from_user.role if from_user.role else "",
                           "REQUESTOR_COMPANY": from_user.company.name,
                           "USER": to_company.creator.first_name + ' ' + to_company.creator.last_name,
                           "LOGIN_URL": request.build_absolute_uri( '/login'),
                           "PROFILE_LINK": request.build_absolute_uri("/private/connections/" + profile_url)}
                          )
        if not silent:
            notify.send(actor, recipient=to_company.creator,
                verb='connection', description=from_user.user.first_name + ' sent you a request', connection= BetEventReverseSerializer(user_connect,many=False, context={"request":request}).data ,
                        profile_picture_url=from_user.profile_picture_url,company_type=from_user.get_company_type())

        return user_connect

    @staticmethod
    def disconnect(from_user, to_user):
        query_set = BetEvent.objects.filter(requester__in = [from_user,to_user], acceptor__in=[to_user,from_user])
        user_connect= None
        if query_set.exists():
            user_connect = query_set.get()
            user_connect.status = 'NONE'
            query_set.delete()

        to_user.save()
        return user_connect

    @staticmethod
    def disconnect_company(from_user, to_company):
        query_set_a = BetEvent.objects.filter(requester=from_user, acceptor__company=to_company)
        query_set_b = BetEvent.objects.filter(requester_company=to_company, acceptor=from_user)
        user_connect = None
        if query_set_a.exists():
            user_connect = query_set_a.get()
            user_connect.status=None
            query_set_a.delete()
        if query_set_b.exists():
            user_connect = query_set_b.get()
            query_set_b.delete()

        to_company.save()
        return user_connect

    @staticmethod
    def reject_request(to_user, requestid):
        request_check = BetEvent.objects.filter(pk=requestid, acceptor=to_user)
        user_connect = None
        if request_check.exists():
            request_check.update(date_rejected = timezone.now())
            user_connect= request_check.get()
        to_user.save()
        return user_connect

    @staticmethod
    def approve_request(to_user, requestid,request):
        from .serializers import BetEventReverseSerializer
        request_check = BetEvent.objects.filter(pk=requestid, acceptor=to_user)
        user_connect = None
        actor = None
        if request_check.exists():
            request_check.update(date_approved = timezone.now())
            user_connect = request_check.get()

            #check if to_user is a LC or FM
            is_listed_company = user_connect.acceptor_company.is_listed_company()
            if is_listed_company:
                actor = user_connect.acceptor_company
            else:
                actor = user_connect.acceptor
            notify.send(actor, recipient=user_connect.requester.user,
                        verb='connection', description=to_user.user.first_name + ' has accepted your request',
                        connection=BetEventReverseSerializer(user_connect, many=False,
                                                                context={"request": request}).data,
                        profile_picture_url=to_user.profile_picture_url, company_type=to_user.get_company_type())
            # to_user.connects.add(BetEvent.objects.get(pk=requestid).requester)
            # to_user.save()
        to_user.save()
        return user_connect