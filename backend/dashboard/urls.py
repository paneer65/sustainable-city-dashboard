""" urls """
from django.urls import path

from dashboard import views

urlpatterns = [
    path('user/login', views.user_login, name='user_login'),
    path('user/view_users', views.view_users, name='view_users'),
    path('user/create_user', views.create_user, name='create_user'),
    path('user/logout', views.logout_user, name='logout'),
    path('pollution/predict', views.predict_location_pollution, name="predict_pollution"),
    path('events/', views.fetch_events, name='fetch_events'),
]
