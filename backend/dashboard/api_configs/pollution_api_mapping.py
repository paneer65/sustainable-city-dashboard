"""
Mappings for pollution apis
"""

POLLUTION_API_MAPPING = [
    {
        "id": 1,
        "api_name": "OpenAQ Pollution",
        "url": "https://api.openaq.org/v1/latest",
        "parameters": {
            "coordinates" : "53.34399,-6.26719",
            "radius" : "500",
        },
        "body_key": "['results']",
        "body_type": "array",
        "mapping": {
            "latitude": "['coordinates']['latitude']",
            "longitude": "['coordinates']['longitude']",
            "location_name": "['location']",
            "measurement_type": "array",
            "measurements_key": "['measurements']",
            "parameter": "['parameter']",
            "value": "['value']",
            "created_at": None,
            "updated_at": "['lastUpdated']",
        }
    }
]
