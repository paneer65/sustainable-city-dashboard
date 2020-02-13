""" Serializers """
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from dashboard.tables.pollution_api_data import PollutionAPIData

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
