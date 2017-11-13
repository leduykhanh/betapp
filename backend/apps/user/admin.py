from django.contrib import admin

# Register your models here.
from .models import *

class BUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'mobile')

admin.site.register(BUser,BUserAdmin)
admin.site.register(UserConnect)
admin.site.register(AccountActivation)