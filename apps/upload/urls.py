from django.conf.urls import include, url
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register(r's3/sign/', views.sign_s3_upload,base_name="s3-sign")

urlpatterns = [
    url(r'^', include(router.urls))
]
