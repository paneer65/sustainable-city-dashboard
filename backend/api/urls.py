"""
API URLs
"""

from django.urls import path
from .views import ListAPIsView, ReturnPollutionDetails

urlpatterns = [
    path('apis/', ListAPIsView.as_view(), name="APIs-all"),
    path('pollution/', ReturnPollutionDetails.as_view(), name="pollution"),
]
