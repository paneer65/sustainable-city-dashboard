"""
Views for API layer
"""
# pylint: disable=arguments-differ
# @Kavith please check this out if you get some time

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dashboard.api_configs.api_translator import APITranslator
from dashboard.serializers import PollutionAPIDataSerializer
from .models import APIs
from .serializers import APISerializer

class ListAPIsView(generics.ListAPIView):
    """
    Provides a GET method handler.
    """
    permission_classes = (IsAuthenticated,)
    queryset = APIs.objects.all()
    serializer_class = APISerializer

    def list(self, request):
        """
        Update data for all apis
        """

        api_translator = APITranslator("pollution", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)
        for model in models:
            model.save()

        return Response(status=200)

class ReturnPollutionDetails(generics.ListAPIView):
    """
    Returns pollution API details
    """
    permission_classes = (IsAuthenticated,)
    queryset = APIs.objects.all()
    serializer_class = PollutionAPIDataSerializer

    def list(self, request):
        """
        Method to provide API details
        """
        api_translator = APITranslator("pollution", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        json_content = self.serializer_class(models, many=True)

        return Response(json_content.data, status=200)
