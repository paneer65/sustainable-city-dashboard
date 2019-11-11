from django.db import models


class Test(models.Model):
    UserName = models.CharField(max_length=100)

    def __str__(self):
        return self.title