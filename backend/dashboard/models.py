from django.db import models
class Dub_bus_time(models.Model):
    stopid = models.CharField(max_length=200)
    displaystopid = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    shortname = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    lastupdated = models.CharField(max_length=200)

class Dub_bikes(models.Model):
    number = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200)
    bike_stands = models.CharField(max_length=200)
    available_bike_stands = models.CharField(max_length=200)
    available_bikes = models.CharField(max_length=200)
    status =  models.CharField(max_length=200)
    last_update = models.CharField(max_length=200)

class Poll_data(models.Model):
    created_at= models.DateTimeField(auto_now_add=True)
    latitude = models.CharField(max_length=200)
    longitude = models.CharField(max_length=200) 
    parameters = models.TextField()
    countsByMeasurement = models.TextField()
