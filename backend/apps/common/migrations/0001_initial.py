# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-09 02:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_defunct', models.DateTimeField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(blank=True, max_length=20)),
                ('file_name', models.CharField(blank=True, max_length=30)),
                ('location', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'resource',
            },
        ),
    ]
