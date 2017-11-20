
from django.db import models
from django.contrib.auth.models import User
from apps.common.models import BaseModel, BaseFollowModel
from django.db.models import Q
from apps.lookup.models import LKUPCountry

class BetCategory(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class BetEvent(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    category = models.ForeignKey(BetCategory)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='images')
    country = models.ForeignKey(LKUPCountry)


class Bet(models.Model):
    SEND_ALL = "Send All"
    SEND_NONE = "Send None"
    SEND_NEW = "Send New"

    STATUS_DRAFT = "DRAFT"
    STATUS_LIVE = "LIVE"
    STATUS_DEFUNCT = "DEFUNCT"
    STATUS = (
        ("DRAFT", STATUS_DRAFT),
        ("LIVE", STATUS_LIVE),
        ("DEFUNCT", STATUS_DEFUNCT),
    )
    firstTeam = models.ForeignKey(Team, related_name='bet_firstTeam')
    secondTeam = models.ForeignKey(Team, related_name='bet_secondTeam')
    state = models.CharField(max_length=10, choices = STATUS)
    firstScore = models.IntegerField(default =0)
    secondScore = models.IntegerField(default =0)
    firstTeamBets = models.IntegerField(default =0)
    secondTeamBets = models.IntegerField(default =0)
    drawBets = models.IntegerField(default =0)
    result = models.IntegerField(default =0)
    expireDate = models.DateTimeField()
    betEvent = models.ForeignKey(BetEvent)