# Generated by Django 2.2.6 on 2020-04-20 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0010_newsapidata'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventsData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=8, max_digits=16)),
                ('longitude', models.DecimalField(decimal_places=8, max_digits=16)),
                ('event_name', models.CharField(max_length=256, null=True)),
                ('event_type', models.CharField(max_length=256, null=True)),
                ('speed_limit', models.IntegerField(null=True)),
                ('starts_at', models.TimeField(null=True)),
                ('ends_at', models.TimeField(null=True)),
            ],
        ),
    ]