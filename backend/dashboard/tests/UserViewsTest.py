from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

class UserViewsTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username = 'test_user', password = 'test_pass')

    def test_login_view_for_valid_user(self):
        response = self.client.post(reverse('user_login'), { 'username': 'test_user', 'password': 'test_pass' }, format='json')
        self.assertEquals(response.status_code, 200)

    def test_login_view_for_invalid_user(self):
        response = self.client.post(reverse('user_login'), { 'username': 'password123', 'password': 'password123' }, format='json')
        self.assertEquals(response.status_code, 403)
