"""
Bikes API Data
"""

from django.db import models

class BikesAPIData(models.Model):
    """ Model for Dublin Bike """
    latitude = models.DecimalField(max_digits=16, decimal_places=8)
    longitude = models.DecimalField(max_digits=16, decimal_places=8)
    location_name = models.CharField(max_length=256, null=True)
    number_of_bikes = models.IntegerField(null=True)
    number_of_stands = models.IntegerField(null=True)
    total_capacity = models.IntegerField(null=True)
    created_at = models.DateTimeField(null=True)
    updated_at = models.DateTimeField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
