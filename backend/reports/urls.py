"""
API URLs
"""

from django.urls import path

from reports import views

urlpatterns = [
    path('line_chart/', views.generate_location_line_chart_data, name='generate_location_line_chart_data'),
]
