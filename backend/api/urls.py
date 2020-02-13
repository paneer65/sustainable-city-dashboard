from django.urls import path
from .views import ListAPIsView
#from api import views

urlpatterns = [
    path('apis/', ListAPIsView.as_view(), name="APIs-all"),
    #path('apis/', ListAPIsView.getAPIs(), name="APIs-all"),
    #path('pollution/', views.ListAPIsView.getAPIs())
]
