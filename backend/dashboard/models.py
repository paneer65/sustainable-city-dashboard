"""Models for the API Data"""
# Disable unused imports
# pylint: disable=unused-import, unused-argument

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from dashboard.tables.pollution_api_data import PollutionAPIData
from dashboard.tables.bikes_api_data import BikesAPIData
from dashboard.tables.bus_api_data import BusAPIData
from dashboard.tables.news_api_data import NewsAPIData
from dashboard.tables.user_profile import Profile
####
from dashboard.tables.ml_data import MlData
####

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """Authentication Callback"""
    if created:
        Token.objects.create(user=instance)
