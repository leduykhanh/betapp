from django.db import models


# Create your models here.
class BaseLookup(models.Model):
    class Meta:
        abstract = True


class LKUPCountry(BaseLookup):
    iso = models.CharField(max_length=3, primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_country'

    def __str__(self):
        return self.name


class LKUPLanguage(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=30)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_language'


class LKUPRegion(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=150)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_region'

    def __str__(self):
        return self.name


class LKUPIndustry(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_industry'

    def __str__(self):
        return self.name


class LKUPSubIndustry(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=50)
    industry = models.ForeignKey(LKUPIndustry)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_sub_industry'

    def __str__(self):
        return self.name


class LKUPAccountType(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=100)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_account_type'


class LKUPEventType(BaseLookup):
    EVENT_TYPE_ONE_ON_ONE = "OOO"
    EVENT_TYPE_MEETING = "MTNG"


    TYPES = (
        ("PRIVATE", "Private"),
        ("PUBLIC", "Public")
    )
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=100)
    visibility = models.CharField(max_length=10, choices=TYPES, default='PUBLIC')

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_event_type'

    def __str__(self):
        return self.name


class LKUPManagementRole(BaseLookup):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=40)

    class Meta:
        app_label = 'lookup'
        db_table = 'lkup_management_role'

    def __str__(self):
        return self.name
