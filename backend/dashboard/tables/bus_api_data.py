"""
Bus API Data
"""
from django.contrib.postgres.fields import ArrayField
from django.db import models

class BusAPIData(models.Model):
    """ Model for Dublin Bus """

    latitude = models.DecimalField(max_digits=16, decimal_places=8, null=True)
    longitude = models.DecimalField(max_digits=16, decimal_places=8, null=True)
    location_name = models.TextField(null=True)
    stop_id = models.TextField(null=True)
    routes = ArrayField(
        models.CharField(max_length=256, null=True),
        size=20,
        null=True
    )
    updated_at = models.DateTimeField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
