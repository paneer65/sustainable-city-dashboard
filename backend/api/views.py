from django.shortcuts import render
from dashboard.api_configs.api_translator import APITranslator
# Create your views here.

from rest_framework import generics
from rest_framework.response import Response
from .models import APIs
from .serializers import APISerializer

class ListAPIsView(generics.ListAPIView):
    """
    Provides a GET method handler.
    """
    queryset = APIs.objects.all()
    serializer_class = APISerializer

    def list(self, request):

        api_translator = APITranslator("pollution", 1)

        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response);
        for m in models:
            m.save()

        return Response(status=200)
