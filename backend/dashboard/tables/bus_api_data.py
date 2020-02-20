"""
Bus API Data
"""

from django.db import models

class BusAPIData(models.Model):
    """ Model for Dublin Bus """
    stopid = models.CharField(max_length=256, null=True)
    latitude = models.CharField(max_length=256, null=True)
    shortname = models.CharField(max_length=256, null=True)
    longitude = models.CharField(max_length=256, null=True)
