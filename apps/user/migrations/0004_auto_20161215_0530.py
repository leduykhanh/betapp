# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-15 05:30
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20161212_0559'),
    ]

    operations = [
        migrations.RenameField(
            model_name='afsuser',
            old_name='connect',
            new_name='connects',
        ),
        migrations.RemoveField(
            model_name='afsuser',
            name='id',
        ),
        migrations.AlterField(
            model_name='afsuser',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
