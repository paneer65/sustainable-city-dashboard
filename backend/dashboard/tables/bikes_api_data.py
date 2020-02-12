"""
Bikes API Data
"""

from django.db import models

class BikesAPIData(models.Model):
    """ Model for Dublin Bike """
    latitude = models.DecimalField(max_digits=16, decimal_places=8)
    longitude = models.DecimalField(max_digits=16, decimal_places=8)
    location_name = models.CharField(max_length=256)
    number_of_bikes = models.IntegerField()
    number_of_stands = models.IntegerField()
    total_capacity = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)
