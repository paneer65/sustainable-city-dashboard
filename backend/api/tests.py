"""
Tests for API layer
"""

from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from rest_framework.authtoken.models import Token
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
        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )
        token = Token.objects.get_or_create(user=self.user)[0]
        self.headers = {'HTTP_AUTHORIZATION': 'Token ' + str(token)}

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
            reverse("APIs-all"),
            **self.headers
        )

        # expected = APIs.objects.all()
        # serialized = APISerializer(expected, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ReturnBikesDetailsTest(BaseViewTest):
    """
    Test return bikes details view
    """

    def test_return_bikes_view(self):
        """
        Test bikes view is returned
        """
        response = self.client.get(
            reverse("bikes"),
            **self.headers
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
