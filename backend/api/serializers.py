from rest_framework import serializers
from .models import APIs


class APISerializer(serializers.ModelSerializer):
    class Meta:
        model = APIs
        fields = ("name", "url")
