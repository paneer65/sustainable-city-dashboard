"""
Admin module for dashboard app
"""

from django.contrib import admin
from dashboard.tables.user_profile import Profile
# Register your models here.
admin.site.register(Profile)
