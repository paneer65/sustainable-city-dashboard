from django.db import models
class Dub_bus_time(models.Model):
    stopid = models.CharField(max_length=200)
    displaystopid = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    shortname = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    lastupdated = models.DateTimeField('date published')