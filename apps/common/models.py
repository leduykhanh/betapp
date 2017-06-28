from django.db import models


# Create your models here.
class BaseModel(models.Model):
    date_defunct = models.DateTimeField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        app_label = 'common'


class BaseFollowModel(models.Model):
    date_followed = models.DateTimeField(auto_now_add=True)
    date_approved = models.DateTimeField(null=True, blank=True)
    date_rejected = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
        app_label = 'common'


class Resource(BaseModel):
    name = models.CharField(max_length=20, blank=True)
    file_name = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=1000)

    class Meta:
        app_label = 'common'
        db_table = 'resource'

    def __str__(self):
        return self.location


