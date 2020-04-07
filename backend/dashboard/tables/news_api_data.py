"""
News API Data
"""

from django.db import models

class NewsAPIData(models.Model):
    """ Model for News data """
    source = models.TextField(null=True)
    title = models.TextField(null=True)
    description = models.TextField(null=True)
    url = models.TextField(null=True)
    url_to_image = models.TextField(null=True)
    published_at = models.DateTimeField(null=True)
    sentiment = models.CharField(max_length=256, null=True)
    sentiment_value = models.DecimalField(null=True, max_digits=16, decimal_places=8)
    timestamp = models.DateTimeField(auto_now_add=True)
