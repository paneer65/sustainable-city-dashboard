import requests
import json
from dashboard.models import Dub_bus_time, Dub_bikes, Poll_data
import datetime

def get_real_time_bus_stop_data(busStopid):
    external_api_url = 'https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?' 
    params = {'stopid' : busStopid}
    responsedata_json = requests.get(external_api_url, params=params)
    response_data = responsedata_json.json()
    if len(response_data['results']) > 0:
        dub_bus_time = Dub_bus_time(stopid=str(response_data['results'][0]['stopid']),displaystopid = str(response_data['results'][0]['displaystopid']),latitude = str(response_data['results'][0]['latitude']),shortname = str(response_data['results'][0]['shortname']),longitude = str(response_data['results'][0]['longitude']),lastupdated = str(datetime.datetime.now()))
        dub_bus_time.save()

def get_real_time_bikes_data():
    external_api_url = 'https://api.jcdecaux.com/vls/v1/stations?' 
    params = {'contract' : 'dublin', 'apiKey' : '75eeaa997aebd3f800b0ded5c505868d62c81961'}
    responsedata_json = requests.get(external_api_url, params=params)
    response_data = responsedata_json.json()
    if response_data:
        dub_bikes = Dub_bikes(number = str(response_data[0]['number']),name = str(response_data[0]['name']),latitude = str(response_data[0]['position']['lat']),longitude = str(response_data[0]['position']['lng']),bike_stands = str(response_data[0]['bike_stands']), available_bike_stands = str(response_data[0]['available_bike_stands']), available_bikes = str(response_data[0]['available_bikes']), status = str(response_data[0]['status']) , last_update = str(response_data[0]['last_update']))
        dub_bikes.save()

def get_real_time_pollution_data():
    external_api_url = 'https://api.openaq.org/v1/locations?'
    params = {'coordinates' : '53.34399,-6.26719', 'radius' : '100000', 'order_by' : 'distance'}
    response_data = requests.get(external_api_url, params=params).json()
    if response_data['results']:
        for i in range(len(response_data['results'])):
            poll_data = Poll_data(latitude = str(response_data['results'][i]['coordinates']['latitude']),longitude = str(response_data['results'][i]['coordinates']['longitude']),parameters = response_data['results'][i]['parameters'], countsByMeasurement = response_data['results'][i]['countsByMeasurement'])
            poll_data.save()