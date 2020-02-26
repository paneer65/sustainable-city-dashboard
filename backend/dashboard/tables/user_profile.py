"""
User profile
"""

# pylint: disable=unused-argument

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from dashboard.the_cacher import TheCacher

class Profile(models.Model):
    """
    User profile model, related to Django User model
    """
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    token = models.TextField(max_length=1000, blank=False)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """ Method to create user profile """
    if created:
        TheCacher().reset_all_cached_users()
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_use_profile(sender, instance, **kwargs):
    """ Method to Save User Profile """
    instance.profile.save()
