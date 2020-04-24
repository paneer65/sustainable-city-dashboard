"""
Models for APIs
"""

from django.db import models

class APIs(models.Model):
    """API name"""
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)

    def __str__(self):
        return "{} - {}".format(self.name, self.url)


class Events(models.Model):
    """API name"""
    name = models.CharField(max_length=200)
    lat = models.CharField(max_length=200)
    lng = models.CharField(max_length=200)
    start = models.CharField(max_length=200)
    end = models.CharField(max_length=200)
    event_type = models.CharField(max_length=200)
