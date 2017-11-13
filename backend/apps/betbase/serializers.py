from apps.betbase.models import Bet, BetEvent

from apps.authentication.views import UserSerializer




from django.contrib.auth.models import AnonymousUser
from django.db.models import Q
from rest_framework import serializers


class BetSerializer(serializers.ModelSerializer):
    user = UserSerializer()


    class Meta:
        model = Bet
        fields = ('user','company', 'language', 'mobile','mobile_cty_code','role','tel','profile_picture_url', 'connections', 'views_count','connection_status')

    def get_connections(self,obj):
        return len(obj.get_connections())

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        user_representation = representation.pop('user')
        for key in user_representation:
            representation[key] = user_representation[key]

        return representation

    def get_connection_status(self,obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            user = request.user
            check = BetEvent.objects.filter((Q(requester__user__in=[user, obj.user]) & Q(acceptor__user__in=[user, obj.user]))
                                               |(Q(requester_company=user.Bet.company) & Q(acceptor__user= obj.user))
                                                | (Q(acceptor__company=user.Bet.company) & Q(requester__user = obj.user)))
            if not check.exists():
                return None
            else:
                user_conn = check.first()
                if user_conn.requester == user_conn.acceptor:
                    return None
                elif user_conn.date_approved:
                    return "CONNECTED"
                elif user_conn.date_rejected:
                    return None
                elif user_conn.requester == obj:
                    return "PENDING_ACCEPT"
                else:
                    return "PENDING_REQUEST"
        return None



class SimpleBetSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    connection_status = serializers.SerializerMethodField()

    class Meta:
        model = Bet
        fields = ('user', 'profile_picture_url', 'connection_status','role')

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        user_representation = representation.pop('user')
        for key in user_representation:
            representation[key] = user_representation[key]

        return representation

    def get_connection_status(self, obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            user = request.user
            check = BetEvent.objects.filter(requester__user__in=[user, obj.user],
                                               acceptor__user__in=[user, obj.user])
            if not check.exists():
                return None
            else:
                user_conn = check.first()
                if user_conn.date_approved:
                    return "CONNECTED"
                elif user_conn.date_rejected:
                    return None
                elif user_conn.requester == obj:
                    return "PENDING_ACCEPT"
                else:
                    return "PENDING_REQUEST"
        return None


class BetEventSerializer(serializers.ModelSerializer):


    def get_user(self,obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            requester = obj.requester
            acceptor = obj.acceptor


            if requester.user.id != request.user.id:
                return BetSerializer(requester,many=False).data
            else:
                return BetSerializer(acceptor,many=False).data

        return None

    def get_company(self, obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            requester = obj.requester
            acceptor = obj.acceptor
            requester_company = obj.requester.company
            acceptor_company = obj.acceptor.company

            if requester.user.id != request.user.id:
                return DetailCompanySerializer(requester_company,many=False).data
            else:
                return DetailCompanySerializer(acceptor_company,many=False).data

        return None

    def get_is_approver(self,obj):

        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            acceptor = obj.acceptor.user_id

            return acceptor == request.user.id

        return False

    def get_connection_status(self,obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            user = request.user
            check = BetEvent.objects.filter(requester__user=obj.requester,
                                               acceptor__user=obj.acceptor)
            if not check.exists():
                return None
            else:
                user_conn = check.first()
                if user_conn.date_approved:
                    return "CONNECTED"
                elif user_conn.date_rejected:
                    return None
                elif user_conn.requester == obj:
                    return "PENDING_ACCEPT"
                else:
                    return "PENDING_REQUEST"
        return None

    class Meta:
        model = BetEvent
        fields = ('id', 'user','connection_status','company','is_approver')


class BetEventReverseSerializer(serializers.ModelSerializer):


    def get_user(self,obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            requester = obj.requester
            acceptor = obj.acceptor


            if requester.user.id == request.user.id:
                return BetSerializer(requester,many=False).data
            else:
                return BetSerializer(acceptor,many=False).data

        return None

    def get_company(self, obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            requester = obj.requester
            acceptor = obj.acceptor
            requester_company = obj.requester.company
            acceptor_company = obj.acceptor.company

            if requester.user.id == request.user.id:
                return DetailCompanySerializer(requester_company,many=False).data
            else:
                return DetailCompanySerializer(acceptor_company,many=False).data

        return None

    def get_is_approver(self,obj):

        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            acceptor = obj.acceptor.user_id

            return acceptor == request.user.id

        return False

    def get_connection_status(self,obj):
        request = self.context.get('request')

        if request is not None and request.user and not isinstance(request.user, AnonymousUser):
            user = request.user
            check = BetEvent.objects.filter(requester__user=obj.requester,
                                               acceptor__user=obj.acceptor)
            if not check.exists():
                return None
            else:
                user_conn = check.first()
                if user_conn.date_approved:
                    return "CONNECTED"
                elif user_conn.date_rejected:
                    return None
                elif user_conn.requester == obj:
                    return "PENDING_ACCEPT"
                else:
                    return "PENDING_REQUEST"
        return None

    class Meta:
        model = BetEvent
        fields = ('id', 'user','connection_status','company','is_approver')



class UserRecommendedSerializer(serializers.Serializer):


    def get_id(self,obj):
        return str(obj.user.user_id)+"-"+str(obj.company.id)
    def get_connection_status(self,obj):
        return None


class StorySerializer(serializers.Serializer):



    def get_item(self,obj):
        from apps.events.serializers import EventSerializer
        from apps.news.serializers import NewsSerializer
        if isinstance(obj,Event):
            return EventSerializer(obj).data
        else:
            return NewsSerializer(obj).data

    def get_user(self, obj):
        return BetSerializer(Bet.objects.get(user=obj.user)).data