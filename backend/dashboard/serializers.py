""" Serializers """
from django.contrib.auth.models import User, Group
from rest_framework import serializers

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
