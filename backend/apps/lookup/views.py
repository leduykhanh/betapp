from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import *


# Create your views here.
class LookupViewSet(ModelViewSet):
    queryset = LKUPCountry.objects.all()
    serializer_class = CountrySerializer

    def list(self, request, *args, **kwargs):
        return Response({
            'country': CountrySerializer(LKUPCountry.objects.all(), many=True).data,
            'language': LanguageSerializer(LKUPLanguage.objects.all(), many=True).data,
            'region': RegionSerializer(LKUPRegion.objects.all(), many=True).data,
            'industry': IndustrySerializer(LKUPIndustry.objects.all(), many=True).data,
            'account_type': AccountTypeSerializer(LKUPAccountType.objects.all(), many=True).data,
            'event_type': EventTypeSerializer(LKUPEventType.objects.all(), many=True).data
        })
