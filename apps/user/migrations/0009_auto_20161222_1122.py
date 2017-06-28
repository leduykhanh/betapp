# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-22 03:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_auto_20161221_1148'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='afsuser',
            name='region',
        ),
        migrations.AlterField(
            model_name='afsuser',
            name='mobile',
            field=models.CharField(default=123456789, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='afsuser',
            name='role',
            field=models.CharField(default='manager', max_length=150),
            preserve_default=False,
        ),
    ]
