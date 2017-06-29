from django.contrib import admin

# Register your models here.
from .models import *


admin.site.register(BetCategory)
admin.site.register(BetEvent)
admin.site.register(Bet)