from apps.user.models import AFSUser
from apps.company.models import Company
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Named (optional) arguments
        parser.add_argument("--total", dest="total")
    @transaction.atomic
    def handle(self, *args, **options):
        total = int(options["total"])
        users = []

        for i in range(100):
            user = User.objects.create(first_name='User%dFirstName' % i,
                        last_name='User%dLastName' % i,
                        username='user%d' % i,
                        email='user%d@gmail.com' % i,
                        password='123456!',
                        is_active=True)
            user.set_password('123456')
            user.save()
            if i%2 == 0:
                company = Company.objects.create(creator=user,name='company%d' % i,company_type="LC")
            else:
                company = Company.objects.create(creator=user, name='company%d' % i, company_type="FM")
            Token.objects.create(user=user)
            afsuser = AFSUser(user=user,mobile="123456789",company=company)
            users.append(afsuser)
        AFSUser.objects.bulk_create(users)

