"""
API URLs
"""

from django.urls import path
from .views import ListAPIsView

urlpatterns = [
    path('apis/', ListAPIsView.as_view(), name="APIs-all"),
]
