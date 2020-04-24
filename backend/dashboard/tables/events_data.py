"""
Events Data
"""

from django.db import models

class EventsData(models.Model):
    """ Model for Event details """
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=10, decimal_places=8)
    event_name = models.CharField(max_length=256, null=True)
    event_type = models.CharField(max_length=256, null=True)
    speed_limit = models.IntegerField(null=True)
    starts_at = models.TimeField(null=True)
    ends_at = models.TimeField(null=True)
