""" Serializers """
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from dashboard.tables.pollution_api_data import PollutionAPIData
from dashboard.tables.bikes_api_data import BikesAPIData
from dashboard.tables.news_api_data import NewsAPIData
from dashboard.tables.bus_api_data import BusAPIData
from dashboard.tables.ml_data import MlData

class UserSerializer(serializers.ModelSerializer):
    """ Serializer for user class """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class GroupSerializer(serializers.ModelSerializer):
    """ Serializer for group class """
    class Meta:
        model = Group
        fields = ['id', 'name']

class PollutionAPIDataSerializer(serializers.ModelSerializer):
    """ Serializer for PollutionAPIData class """
    class Meta:
        model = PollutionAPIData
        fields = [
            'latitude', 'longitude', 'location_name', 'parameter', 'value', 'created_at',
            'updated_at', 'timestamp'
        ]

class BusAPIDataSerializer(serializers.ModelSerializer):
    """ Serializer for BusAPIData class """
    class Meta:
        model = BusAPIData
        fields = [
            'latitude', 'longitude', 'location_name', 'stop_id', 'routes',
            'updated_at', 'timestamp'
        ]


class BikesAPIDataSerializer(serializers.ModelSerializer):
    """ Serializer for BikesAPIData class """
    class Meta:
        model = BikesAPIData
        fields = [
            'latitude', 'longitude', 'location_name', 'number_of_bikes',
            'total_capacity', 'created_at', 'updated_at', 'timestamp'
        ]

class NewsAPIDataSerializer(serializers.ModelSerializer):
    """ Serializer for NewsAPIData class """
    class Meta:
        model = NewsAPIData
        fields = [
            'source', 'title', 'description', 'url', 'url_to_image',
            'published_at', 'sentiment', 'sentiment_value', 'timestamp'
        ]

class MlModelDataSerializer(serializers.ModelSerializer):
    """ Serializer for MLModel Class """
    class Meta:
        model = MlData
        fields = ['latitude', 'longitude', 'pollution']
