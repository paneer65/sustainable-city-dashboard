"""
Pollution API Data
"""

from django.db import models

class PollutionAPIData(models.Model):
    """ Generic model for pollution based API's """
    latitude = models.DecimalField(max_digits=16, decimal_places=8)
    longitude = models.DecimalField(max_digits=16, decimal_places=8)
    location_name = models.CharField(max_length=256, null=True)
    parameter = models.CharField(max_length=256, null=True)
    value = models.DecimalField(max_digits=16, decimal_places=8, null=True)
    created_at = models.DateTimeField(null=True)
    updated_at = models.DateTimeField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
