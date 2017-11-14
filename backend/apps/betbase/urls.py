from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'bet', BetViewSet)
# router.register(r'user/news', UserNewsViewSet)
# router.register(r'user', AFSUserViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
