from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import APIs
from .serializers import APISerializer

class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_API(name="", url=""):
        if name != "" and url != "":
            APIs.objects.create(name=name, url=url)

    def setUp(self):
        """Test Data"""
        self.create_API("Traffic", "traffic.com")
        self.create_API("Pollution", "pollution.com")
        self.create_API("Events", "events.com")

class GetAllAPIsTest(BaseViewTest):

    def test_get_all_APIs(self):
        """
            This test ensures that all APIs added in the setUp method
            exist when we make a GET request to the api/ endpoint
        """

        response = self.client.get(
            reverse("APIs-all", kwargs={"version": "v1"})
        )

        expected = APIs.objects.all()
        serialized = APISerializer(expected, many=True)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
