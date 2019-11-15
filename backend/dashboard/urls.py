from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from dashboard import views

urlpatterns = [
    path('user/login', views.user_login, name = 'user_login'),
]
