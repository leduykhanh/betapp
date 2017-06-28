from apps.user.models import AFSUser
from apps.company.models import Company

from apps.common.mangers.email_manager import send_mail, send_mail1
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
        send_mail("event/invite","leejangkoo@gmail.com", {"url":"abcc.com"})

