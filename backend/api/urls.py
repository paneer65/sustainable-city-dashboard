"""
API URLs
"""

from django.urls import path
from .views import (
    ListAPIsView, ReturnPollutionDetails, ReturnBikesDetails, ReturnNewsDetails,
    ReturnMlPrediction, ReturnBusDetails
)

urlpatterns = [
    path('apis/', ListAPIsView.as_view(), name="APIs-all"),
    path('pollution/', ReturnPollutionDetails.as_view(), name="pollution"),
    path('bikes/', ReturnBikesDetails.as_view(), name="bikes"),
    path('news/', ReturnNewsDetails.as_view(), name="news"),
    path('bus/', ReturnBusDetails.as_view(), name="bus"),
    path('mlmodel/', ReturnMlPrediction.as_view(), name="mlmodel")
]
