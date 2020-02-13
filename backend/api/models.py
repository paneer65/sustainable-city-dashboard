from django.db import models

# Create your models here.

class APIs(models.Model):
    """API name"""
    name = models.CharField(max_length=200)
    """URL"""
    url = models.CharField(max_length=200)

    def __str__(self):
        return "{} - {}".format(self.name, self.url)
