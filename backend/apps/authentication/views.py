from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
import urllib
import urllib3
import json
import logging
logger = logging.getLogger(__name__)
from django.shortcuts import redirect
# Create your views here.

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    date_joined = serializers.DateTimeField(format="%d-%b-%Y %H:%M")
    class Meta:
        model = User
        fields = ('id','email', 'first_name', 'last_name','is_superuser','date_joined')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.queryset

    def get(self, request):
        return UserSerializer(self.get_queryset())


def confirm_email_view(request,key):
    encoded_body = json.dumps({
        "key": key
    })

    http = urllib3.PoolManager()
    url = request.get_host()+'/api/auth/rest-auth/registration/verify-email/'
    logger.debug(url)
    r = http.request('POST', url,
                     headers={'Content-Type': 'application/json'},
                     body=encoded_body)


    return redirect("verify")

def email_verification_sent(request):
    pass
