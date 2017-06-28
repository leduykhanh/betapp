from django.contrib import admin

# Register your models here.
from .models import *

class AFSUserAdmin(admin.ModelAdmin):
    list_display = ('user','company')

admin.site.register(AFSUser,AFSUserAdmin)
admin.site.register(UserConnect)
admin.site.register(AccountActivation)