
"""
Mappings for Bus apis
"""

BUS_API_MAPPING = [
    {
        "id": 1,
        "api_name": "Smart dublin bus api",
        "url": "https://data.smartdublin.ie/cgi-bin/rtpi/busstopinformation?",
        "parameters": {"operator" : "bac"},
        "body_key": "['results']",
        "body_type": "array",
        "mapping": {
            "latitude": "['latitude']",
            "longitude": "['longitude']",
            "location_name": "['fullname']",
            "stop_id": "['stopid']",
            "updated_at": "['lastupdated']",
            "operators_key": "['operators']",
            "operators_type": "array",
            "routes": "['routes']"
        }
    }
]
