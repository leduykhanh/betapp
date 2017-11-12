from apps.user.models import AFSUser
from apps.company.models import Company

from allauth.account.models import EmailAddress
from apps.user.models import AccountActivation
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from rest_framework.authtoken.models import Token


class Command(BaseCommand):

    @transaction.atomic
    def handle(self, *args, **options):

        for user_email in EmailAddress.objects.all():

            aa = AccountActivation.objects.get_or_create(user=user_email.user)

            aa[0].status = "APPROVED"
            aa[0].save()

