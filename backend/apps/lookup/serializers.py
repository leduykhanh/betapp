from rest_framework.serializers import ModelSerializer
from .models import *


class CountrySerializer(ModelSerializer):
    class Meta:
        model = LKUPCountry
        fields = ('iso', 'name')


class LanguageSerializer(ModelSerializer):
    class Meta:
        model = LKUPLanguage
        fields = ('code', 'name')


class RegionSerializer(ModelSerializer):
    class Meta:
        model = LKUPRegion
        fields = ('code', 'name', 'description')


class IndustrySerializer(ModelSerializer):
    class Meta:
        model = LKUPIndustry
        fields = ('code', 'name')


class AccountTypeSerializer(ModelSerializer):
    class Meta:
        model = LKUPAccountType
        fields = ('code', 'name', 'description')


class EventTypeSerializer(ModelSerializer):
    class Meta:
        model = LKUPEventType
        fields = ('code', 'name', 'description','visibility')
