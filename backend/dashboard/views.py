""" Views """
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication

from dashboard.serializers import UserSerializer
from dashboard.ml_pollution.poll_predict import mypredict
from dashboard.the_cacher import TheCacher

from dashboard.tables.events_data import EventsData
from dashboard.serializers import EventsDataSerializer


@api_view(['POST'])
def user_login(request):
    """ User Login """
    username = request.data["username"]
    password = request.data["password"]

    user = authenticate(username=username, password=password)
    if user is not None:
        # Authentication success
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        response = Response({'Token': str(token), 'created': created}, status=200)
    else:
        # Authentication failed
        response = Response(
            {
                'error': 'Username or password is invalid'
            },
            status=403
        )
    return response

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_user(request):
    """ Create User """
    email = request.data['email']
    username = request.data['username']
    password = request.data['password']
    try:
        new_user = User.objects.create_user(username, email, password)
        new_user.save()
        response = Response({}, status=200)
    except IntegrityError:
        response = Response(
            {
                'error': 'Username or email already exists',
            },
            status=400
        )
    return response

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def view_users(request):
    """ View User """
    users = TheCacher.get_all_cached_users()
    if users is not None:
        serializer = UserSerializer(users, many=True)
        response = Response(
            {
                'users': serializer.data
            },
            status=200
        )
    else:
        response = Response(
            {
                'error': 'Unknown error'
            },
            status=500
        )

    return response

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """ Deleting Token before Logout """

    response = Response(
        status=200
    )
    return response

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def predict_location_pollution(request):
    """ Return pollution level estimate for a location """

    latitude = request.data["latitude"]
    longitude = request.data["longitude"]
    _, _, prediction = mypredict(coord=[latitude, longitude])

    return Response(
        {
            'pollution_level': prediction
        },
        status=200
    )

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_events(request):
    """ Fetch events from the database """
    events = EventsData.objects.all()
    serializer = EventsDataSerializer(events, many=True)
    response = Response(
        {
            'events': serializer.data
        },
        status=200
    )
    return response
