__author__ = 'Pok'
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_jwt.views import refresh_jwt_token
from .views import UserViewSet, confirm_email_view,email_verification_sent


router = DefaultRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls) ),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', confirm_email_view,name='account_confirm_email'),
    url(r"^confirm-email/$", email_verification_sent,name="account_email_verification_sent"),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]

