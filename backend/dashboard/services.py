import requests
import json
from dashboard.models import Dub_bus_time, Dub_bikes
import datetime

def get_real_time_bus_stop_data(busStopid):
    external_api_url = 'https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?' 
    params = {'stopid' : busStopid}
    responsedata_json = requests.get(external_api_url, params=params)
    responsedata = responsedata_json.json()
    if len(responsedata['results']) > 0:
        dub_bus_time = Dub_bus_time(stopid=str(responsedata['results'][0]['stopid']),displaystopid = str(responsedata['results'][0]['displaystopid']),latitude = str(responsedata['results'][0]['latitude']),shortname = str(responsedata['results'][0]['shortname']),longitude = str(responsedata['results'][0]['longitude']),lastupdated = str(datetime.datetime.now()))
        dub_bus_time.save()

def get_real_time_bikes_data():
    external_api_url = 'https://api.jcdecaux.com/vls/v1/stations?' 
    params = {'contract' : 'dublin', 'apiKey' : '75eeaa997aebd3f800b0ded5c505868d62c81961'}
    responsedata_json = requests.get(external_api_url, params=params)
    responsedata = responsedata_json.json()
    if responsedata:
        dub_bikes = Dub_bikes(number = str(responsedata[0]['number']),name = str(responsedata[0]['name']),latitude = str(responsedata[0]['position']['lat']),longitude = str(responsedata[0]['position']['lng']),bike_stands = str(responsedata[0]['bike_stands']), available_bike_stands = str(responsedata[0]['available_bike_stands']), available_bikes = str(responsedata[0]['available_bikes']), status = str(responsedata[0]['status']) , last_update = str(responsedata[0]['last_update']))
        dub_bikes.save()