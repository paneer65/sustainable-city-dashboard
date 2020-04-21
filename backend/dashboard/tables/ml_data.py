"""
ML Model Data
"""

from django.db import models

class MlData(models.Model):
    """ML Data"""
    latitude = models.DecimalField(max_digits=16, decimal_places=10)
    longitude = models.DecimalField(max_digits=16, decimal_places=10)
    pollution = models.DecimalField(max_digits=16, decimal_places=8)
