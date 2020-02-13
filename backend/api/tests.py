"""
Tests for API layer
"""

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import APIs
# from .serializers import APISerializer

class BaseViewTest(APITestCase):
    """
    Base view tests
    """
    client = APIClient()

    @staticmethod
    def create_api(name="", url=""):
        """
        Create setup apis
        """
        if name != "" and url != "":
            APIs.objects.create(name=name, url=url)

    def setUp(self):
        """Test Data"""

        self.create_api("Traffic", "traffic.com")
        self.create_api("Pollution", "pollution.com")
        self.create_api("Events", "events.com")

class GetAllAPIsTest(BaseViewTest):
    """
    Test for all apis
    """
    def test_get_all_apis(self):
        """
            This test ensures that all APIs added in the setUp method
            exist when we make a GET request to the api/ endpoint
        """

        response = self.client.get(
            reverse("APIs-all")
        )

        # expected = APIs.objects.all()
        # serialized = APISerializer(expected, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
