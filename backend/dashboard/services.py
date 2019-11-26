import requests
import json
from dashboard.models import Dub_bus_time
import datetime

def get_real_time_bus_stop_data(busStopid):
    external_api_url = 'https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?' 
    params = {'stopid' : busStopid}
    responsedata_json = requests.get(external_api_url, params=params)
    responsedata = responsedata_json.json()
    if len(responsedata['results']) > 0:
        dub_bus_time = Dub_bus_time(stopid=str(responsedata['results'][0]['stopid']),displaystopid = str(responsedata['results'][0]['displaystopid']),latitude = str(responsedata['results'][0]['latitude']),shortname = str(responsedata['results'][0]['shortname']),longitude = str(responsedata['results'][0]['longitude']),lastupdated = str(datetime.datetime.now()))
        dub_bus_time.save()
    