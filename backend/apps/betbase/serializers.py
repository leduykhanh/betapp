from apps.betbase.models import Team, Bet, BetCategory, BetEvent

from apps.authentication.views import UserSerializer

from django.contrib.auth.models import AnonymousUser
from django.db.models import Q
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('__all__')  

class BetEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = BetEvent
        fields = ('name', 'description', 'id')

class BetSerializer(serializers.ModelSerializer):

    firstTeam = TeamSerializer()
    secondTeam = TeamSerializer()
    betEvent = BetEventSerializer()

    class Meta:
        model = Bet
        fields = ('__all__')


class BetCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = BetCategory
        fields = ('__all__')

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


class BetEventReverseSerializer(serializers.ModelSerializer):


    class Meta:
        model = BetEvent
        fields = ('__all__')

      



