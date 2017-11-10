from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from .views import LookupViewSet

router = SimpleRouter()
router.register(r'lookup', LookupViewSet)
urlpatterns = [
    url(r'^', include(router.urls))
]
