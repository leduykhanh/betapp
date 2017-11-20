from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()

router.register(r'^bet$', BetViewSet)
router.register(r'betcategory', BetCategoryViewSet)
router.register(r'betevent', BetEventViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
