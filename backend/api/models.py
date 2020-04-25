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
