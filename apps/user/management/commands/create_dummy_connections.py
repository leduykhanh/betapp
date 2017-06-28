from apps.user.models import AFSUser
from apps.company.models import Company

from apps.user.models import UserConnect
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Named (optional) arguments
        # parser.add_argument("--total", dest="total")
        pass

    @transaction.atomic
    def handle(self, *args, **options):
        user_conns = []
        user0 = User.objects.get(email="hughpok+2@gmail.com")
        for i in range(100):
            user = User.objects.get(username=("user" + str(i % 99 + 1)))
            acceptor = AFSUser.objects.get(user=user0)
            requester = AFSUser.objects.get(user=user)
            date_approved = timezone.now()
            if i%2 == 0:
                acceptor = AFSUser.objects.get(user=user)
                requester = AFSUser.objects.get(user=user0)
            if i%6 ==0:
                date_approved = None

            user_conns.append(UserConnect(acceptor=acceptor,requester=requester,requester_company=requester.company,
                              acceptor_company=acceptor.company,date_approved=date_approved))
        UserConnect.objects.bulk_create(user_conns)

