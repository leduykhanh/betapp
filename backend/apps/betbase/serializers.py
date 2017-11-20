from apps.betbase.models import Bet, BetEvent, BetCategory

from apps.authentication.views import UserSerializer

from django.contrib.auth.models import AnonymousUser
from django.db.models import Q
from rest_framework import serializers


class BetSerializer(serializers.ModelSerializer):


    class Meta:
        model = Bet
        fields = ('firstTeam', 'secondTeam')


class BetCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = BetCategory
        fields = ('name', 'description', 'id')

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



class BetEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = BetEvent
        fields = ('name', 'description', 'id')


class BetEventReverseSerializer(serializers.ModelSerializer):


    class Meta:
        model = BetEvent
        fields = ('id', 'user','connection_status','company','is_approver')



