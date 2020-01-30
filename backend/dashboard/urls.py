from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from dashboard import views

urlpatterns = [
    path('user/login', views.user_login, name = 'user_login'),
    path('user/view_users', views.view_users, name = 'view_users'),
    path('user/create_user',views.create_user, name ='create_user'),
]
