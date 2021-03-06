# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-29 08:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lookup', '0005_lkupeventtype_visibility'),
    ]

    operations = [
        migrations.CreateModel(
            name='LKUPSubIndustry',
            fields=[
                ('code', models.CharField(max_length=5, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('industry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lookup.LKUPIndustry')),
            ],
            options={
                'db_table': 'lkup_sub_industry',
            },
        ),
    ]
