from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dashboard.serializers import UserSerializer
from dashboard.services import get_real_time_bus_stop_data

@api_view(['POST'])
def user_login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username = username, password = password)
    if user is not None:
        # Authentication success
        user = login(request, user)
        serializer = UserSerializer(user)
        get_real_time_bus_stop_data(342)
        return Response({'data': serializer.data}, status=200)
    else:
        # Authentication failed
        return Response({ 'error': 'Username or password is invalid' }, status=403)
