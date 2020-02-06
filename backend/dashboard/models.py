""" Models """
from django.db import models

class DubBusTime(models.Model):
    """ Model for Dublin Bus """
    stop_id = models.CharField(max_length=200)
    display_stop_id = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    shortname = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    last_updated = models.CharField(max_length=200)

class DubBikes(models.Model):
    """ Model for Dublin Bike """
    number = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    bike_stands = models.CharField(max_length=200)
    available_bike_stands = models.CharField(max_length=200)
    available_bikes = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    last_update = models.CharField(max_length=200)

class PollData(models.Model):
    """ Model for Pollution Data """
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    measurements = models.TextField()
