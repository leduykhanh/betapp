from apps.user.models import AFSUser
from apps.company.models import Company
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Named (optional) arguments
        pass
    @transaction.atomic
    def handle(self, *args, **options):

        last_id = Company.objects.last().id
        for i in range(100):
            user = User.objects.get(username=("user" + str(i % 99 + 1)))
            afsuser = AFSUser.objects.get(user=user)
            if not afsuser.company:
                afsuser.company = Company.objects.all()[i]
                afsuser.save()

