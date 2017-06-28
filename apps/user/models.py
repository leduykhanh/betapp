from apps.company.models import Company
from django.db import models
from django.contrib.auth.models import User
from apps.common.models import BaseModel, BaseFollowModel
from apps.lookup.models import LKUPCountry, LKUPLanguage, LKUPIndustry, LKUPRegion, LKUPAccountType


# Create your models here.
from django.db.models import Q

class AFSUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    mobile = models.CharField(max_length=20)
    mobile_cty_code = models.CharField(max_length=6,null=True)
    profile_picture_url = models.CharField(max_length=1000, null=True, blank=True)
    company = models.ForeignKey(Company, null=True, blank=True)
    role = models.CharField(max_length=150, null=True, blank=True)
    tel = models.CharField(max_length=20, null=True, blank=True)
    tel_cty_code = models.CharField(max_length=6,null=True)
    language = models.ForeignKey(LKUPLanguage, null=True, blank=True)
    message = models.CharField(max_length=800, null=True, blank=True)
    connects = models.ManyToManyField("self", through='UserConnect', symmetrical=False)
    views_count = models.IntegerField(default=0, blank=True)

    class Meta:
        app_label = 'user'
        db_table = 'afs_user'

    def __str__(self):
        return self.user.username

    def get_company_type(self):
        if not self.company:
            return None
        return self.company.company_type

    def is_from_listed_company(self):
        return self.get_company_type() == "LC"

    def get_pending_connections(self, *or_filter, **filters):
        connections = self.connects.through.objects.filter(Q(acceptor=self) | Q(acceptor_company=self.company),
                                                                  date_approved__isnull=True,
                                                                  date_rejected__isnull=True)
        if filters or or_filter:
            connections = connections.filter(*or_filter, **filters)
        return connections
        # return [c.requester for c in connections if c.acceptor==self] + [c.acceptor for c in connections if c.requester==self]

    def get_requesting_connections(self, *or_filter, **filters):
        connections = self.connects.through.objects.filter(Q(requester=self) | Q(requester_company=self.company),
                                                                  date_approved__isnull=True,
                                                                  date_rejected__isnull=True)
        if filters or or_filter:
            connections = connections.filter(*or_filter, **filters)
        return connections

    def get_connections(self,*or_filter, **filters):
        connections = self.connects.through.objects.filter(Q(requester=self) | Q(acceptor=self)
                                                          ,
                                                           date_approved__isnull=False,
                                                           date_rejected__isnull=True)
        if filters or or_filter:
            connections = connections.filter(*or_filter, **filters)
        # return [c.requester for c in connections if c.acceptor == self] + [c.acceptor for c in connections if
        #                                                                c.requester == self]


        return connections

    def get_connection_users(self):
        # connections = self.connects.through.objects.filter(Q(requester=self) | Q(acceptor=self),
        #                                                    date_approved__isnull=False,
        #                                                    date_rejected__isnull=True)
        connections = self.get_connections()

        return [c.requester.user for c in connections if c.acceptor == self] + [c.acceptor.user for c in connections if
                                                                           c.requester == self]

    def get_pending_connection_users(self):
        # connections = self.connects.through.objects.filter(Q(requester=self) | Q(acceptor=self),
        #                                                    date_approved__isnull=False,
        #                                                    date_rejected__isnull=True)
        connections = self.get_pending_connections()

        return connections.values("requester__user")

    def get_requesting_connection_users(self):
        # connections = self.connects.through.objects.filter(Q(requester=self) | Q(acceptor=self),
        #                                                    date_approved__isnull=False,
        #                                                    date_rejected__isnull=True)
        connections = self.get_requesting_connections()

        return connections.values("acceptor__user")


class UserConnect(BaseFollowModel):

    requester = models.ForeignKey(AFSUser, on_delete=models.CASCADE, related_name='request_user')
    requester_company = models.ForeignKey(Company, null=True, blank=True, related_name='request_company')
    acceptor = models.ForeignKey(AFSUser, on_delete=models.CASCADE, related_name='accept_user')
    acceptor_company = models.ForeignKey(Company, null=True, blank=True, related_name='acceptor_company')

    class Meta:
        app_label = 'user'
        db_table = 'user_connect'
        unique_together = ('requester', 'acceptor', 'requester_company', 'acceptor_company')

    def __str__(self):
        return str(self.requester) + ' to ' + str(self.acceptor)


class AccountActivation(models.Model):
    STATUS_PENDING = "PENDING"
    STATUS_REJECTED = "REJECTED"
    STATUS_APPROVED = "APPROVED"
    STATUS = (
        ("PENDING", "PENDING"),
        ("REJECTED", "REJECTED"),
        ("APPROVED", "APPROVED")
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="account_activation_user")
    status = models.CharField(max_length=10, default="PENDING", choices=STATUS)

    def __str__(self):
        return self.user.email

