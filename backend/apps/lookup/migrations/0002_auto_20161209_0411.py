# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-09 04:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lookup', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lkupaccounttype',
            name='id',
        ),
        migrations.RemoveField(
            model_name='lkupcountry',
            name='id',
        ),
        migrations.RemoveField(
            model_name='lkupindustry',
            name='id',
        ),
        migrations.RemoveField(
            model_name='lkuplanguage',
            name='id',
        ),
        migrations.RemoveField(
            model_name='lkupregion',
            name='id',
        ),
        migrations.AddField(
            model_name='lkupaccounttype',
            name='code',
            field=models.CharField(default='TEST', max_length=5, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lkupindustry',
            name='code',
            field=models.CharField(default='TEST', max_length=5, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lkuplanguage',
            name='code',
            field=models.CharField(default='TEST', max_length=5, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lkupregion',
            name='code',
            field=models.CharField(default='TEST', max_length=5, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='lkupcountry',
            name='iso',
            field=models.CharField(max_length=3, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='lkupindustry',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
