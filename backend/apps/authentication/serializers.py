from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from apps.user.managers import BUserManager

from apps.common.exception import NonFieldException

from django.contrib.auth.models import User
from rest_framework import serializers,exceptions
from django.utils.translation import gettext as _
from django.urls import reverse
from rest_framework.authtoken.models import Token
from apps.user.models import BUser
from django.contrib.auth import get_user_model, authenticate

from apps.lookup.models import LKUPAccountType,LKUPLanguage,LKUPCountry,LKUPIndustry,LKUPRegion
#from apps.company.managers import CompanyManager
from rest_auth.serializers import LoginSerializer
from django.db import transaction
from django.conf import settings
from apps.common.exception import JSONException
from rest_auth.serializers import PasswordResetSerializer
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_auth.utils import import_callable
from apps.user.models import AccountActivation
from rest_auth.serializers import UserDetailsSerializer

from django.contrib.auth.forms import PasswordResetForm
UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'last_name','is_superuser','date_joined')
        read_only_fields = ('email', )


# Required to allow using custom USER_DETAILS_SERIALIZER  in
# JWTSerializer. Defining it here to avoid circular imports
rest_auth_serializers = getattr(settings, 'REST_AUTH_SERIALIZERS', {})
JWTUserDetailsSerializer = import_callable(
    rest_auth_serializers.get('USER_DETAILS_SERIALIZER', UserDetailsSerializer)
)

class BJWTSerializer(serializers.Serializer):
    """
    Serializer for JWT authentication.
    """
    token = serializers.CharField()
    user = UserSerializer()
# class UserSerializer(UserDetailsSerializer):
#     """
#     User model w/o password
#     """
#
#     class Meta(UserDetailsSerializer.Meta):
#         fields = UserDetailsSerializer.Meta.fields + ('is_superuser','date_joined')


class PasswordResetSerializer(PasswordResetSerializer):

    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }
        adapter = get_adapter()
        email = self.reset_form.cleaned_data["email"]
        if not User.objects.filter(email=email).exists():
            raise NonFieldException("reset_pwd",["Email doesn't exist in our system."])
        else:
            user =  User.objects.get(email=email)
            activation_check = user.account_activation_user

            if activation_check.status == AccountActivation.STATUS_REJECTED:
                raise NonFieldException("reset_pwd",
                                        ["Your account has been terminated by the administrator of the website."])
            if activation_check.status == AccountActivation.STATUS_PENDING:
                raise NonFieldException("reset_pwd", [
                    "Your account is pending activation. You can only reset password after it has been activated."])
        for user in self.reset_form.get_users(email):
            current_site = get_current_site(request)
            site_name = current_site.name
            domain = current_site.domain
            context = {
                'email': user.email,
                'site_name': site_name,
                'user': user,
                'reset_url': domain+'/rest/auth'+reverse("password_reset_confirm",kwargs={'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),'token':default_token_generator.make_token(user)})
            }
            adapter.send_mail("account/email/email_reset_password", user.email, context)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    type = serializers.CharField(required=True,write_only=True)
    mobile = serializers.CharField(required=True, write_only=True)
    mobile_cty_code = serializers.CharField(required=True, write_only=True)
    company_name = serializers.JSONField(required=True, write_only=True)
    # uen = serializers.CharField(required=True,write_only=True)

    # password2 = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        # if data['password1'] != data['password2']:
        #     raise serializers.ValidationError(
        #         _("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'type': self.validated_data.get('type', ''),
            'company_name': self.validated_data.get('company_name', ''),
            'mobile': self.validated_data.get('mobile', ''),
            'mobile_cty_code': self.validated_data.get('mobile_cty_code', ''),
            # 'uen': self.validated_data.get('uen', ''),
        }

    @transaction.atomic
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.set_password(self.cleaned_data.get("password"))
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])

        Token.objects.create(user=user)
        self.create_user(self.cleaned_data, user)
        return user

    def create_user(self,data,user):
        account_type = data.get("type")
        # uen = data.get("uen")
        type = LKUPAccountType.objects.get(pk=account_type)
        company = data.get("company_name")
        if not "company_type" in company:
            company["company_type"] = account_type
        # company["uen"] = uen
        mobile = data.get("mobile")
        mobile_cty_code = data.get("mobile_cty_code")

        BUser = BUserManager.create_B_user(user=user, company=company, mobile=mobile,mobile_cty_code=mobile_cty_code)
        AccountActivation.objects.create(user=user)

        return BUser


class BLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        super().validate(attrs)
        user = attrs['user']
        try:
            activation_check = user.account_activation_user

            if activation_check.status == AccountActivation.STATUS_REJECTED:
                raise NonFieldException("login",
                                        ["Your account has been terminated by the administrator of the website."])
            if activation_check.status == AccountActivation.STATUS_PENDING:
                raise NonFieldException("login", [
                    "Your account is pending activation. You can only login after it has been activated."])
        except AccountActivation.DoesNotExist:
            raise NonFieldException("login", ["Your account is pending activation. You can only login after it has been activated."])
        return attrs
