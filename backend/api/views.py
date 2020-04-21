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
from dashboard.serializers import BikesAPIDataSerializer
from dashboard.serializers import NewsAPIDataSerializer
from dashboard.the_cacher import TheCacher
from dashboard.tables.ml_data import MlData
from dashboard.ml_pollution.poll_predict import mypredict
from dashboard.ml_pollution.poll_predict import random_coord
from dashboard.serializers import MlModelDataSerializer
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

class ReturnBikesDetails(generics.ListAPIView):
    """
    Returns bikes API data
    """
    permission_classes = (IsAuthenticated,)
    queryset = APIs.objects.all()
    serializer_class = BikesAPIDataSerializer

    def list(self, request):
        """
        List bikes API data
        """
        api_translator = APITranslator("bikes", 1)
        response = api_translator.build_api_request()
        models = api_translator.response_to_model(response)

        json_content = self.serializer_class(models, many=True)
        return Response(json_content.data, status=200)

class ReturnNewsDetails(generics.ListAPIView):
    """
    Returns news API data
    """
    permission_classes = (IsAuthenticated,)
    queryset = APIs.objects.all()
    serializer_class = NewsAPIDataSerializer

    def list(self, request):
        """
        List news API data
        """
        models = TheCacher.get_latest_news()

        if not models:
            api_translator = APITranslator("news", 1)
            response = api_translator.build_api_request()
            models = api_translator.response_to_model(response)

        json_content = self.serializer_class(models, many=True)
        return Response(json_content.data, status=200)

class ReturnMlPrediction(generics.ListAPIView):
    """
    Returns Predicted Data
    """
    permission_classes = (IsAuthenticated,)
    queryset = APIs.objects.all()
    serializer_class = MlModelDataSerializer
    def list(self, request):
        result = []
        sample = random_coord()
        for i in range(len(sample)):
            lat, long, predict = mypredict(list(sample.iloc[i]))
            model = MlData(latitude=lat, longitude=long, pollution=predict)
            result.append(model)
        json_content = self.serializer_class(result, many=True)
        return Response(json_content.data, status=200)
