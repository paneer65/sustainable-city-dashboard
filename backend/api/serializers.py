"""
Serializers listed here
"""

from rest_framework import serializers
from .models import APIs

class APISerializer(serializers.ModelSerializer):
    """
    APISerializer def
    """
    class Meta:
        """
        Meta class
        """
        model = APIs
        fields = ("name", "url")
