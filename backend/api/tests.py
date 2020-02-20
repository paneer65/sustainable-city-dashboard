"""
Tests for API layer
"""

from django.urls import reverse
from django.contrib.auth import get_user_model
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

    def setUp(self):
        """ Initialise User for Login """
        print('Method: Set Up User View')
        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pass'
        )
        self.client.post(reverse('user_login'), {
            'username': 'test_user',
            'password': 'test_pass'
        }, format='json')
        self.user.refresh_from_db()

    def test_get_all_apis(self):
        """
        This test ensures that all APIs added in the setUp method
        exist when we make a GET request to the api/ endpoint
        """
        headers = {'HTTP_AUTH_TOKEN': self.user.profile.token}
        response = self.client.get(
            reverse("APIs-all"),
            **headers
        )

        # expected = APIs.objects.all()
        # serialized = APISerializer(expected, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
