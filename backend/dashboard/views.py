from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from dashboard.serializers import UserSerializer
from dashboard.services import get_real_time_bus_stop_data
from dashboard.services import get_real_time_bikes_data
from dashboard.services import get_real_time_pollution_data

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
        get_real_time_bikes_data()
        get_real_time_pollution_data()
        return Response({'user': serializer.data}, status=200)
    else:
        # Authentication failed
        return Response({ 'error': 'Username or password is invalid' }, status=403)

@api_view(['POST'])
def create_user(request):
    email = request.data['email']
    username = request.data['username']
    password = request.data['password']


    try:
        new_user = User.objects.create_user(username, email, password)
        new_user.save()
        return Response({}, status=200)
    except IntegrityError as e:
        return Response({ 'error': "Username or email already exists" }, status=400)

@api_view(['GET'])
def view_users(request):
    users = User.objects.all()
    if users is not None:
        serializer = UserSerializer(users, many=True)
        return Response({ 'users': serializer.data }, status=200)
    else:
        return Response({ 'error': 'Unknown error' }, status=500)


