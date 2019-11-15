from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dashboard.serializers import UserSerializer

@api_view(['POST'])
def user_login(request):
    # var csrftoken = Cookies.get('csrftoken')
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username = username, password = password)
    if user is not None:
        # Authentication success
        user = login(request, user)
        serializer = UserSerializer(user)
        return Response({'data': serializer.data}, status=200)
    else:
        # Authentication failed
        return Response({ 'error': 'Username or password is invalid' }, status=403)
