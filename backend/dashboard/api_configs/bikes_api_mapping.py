
"""
Mappings for bikes apis
"""

BIKES_API_MAPPING = [
    {
        "id": 1,
        "api_name": "jcdecaux dublin bikes api",
        "url": "https://api.jcdecaux.com/vls/v1/stations?",
        "parameters": {
            "contract" : "dublin",
            "apiKey" : "75eeaa997aebd3f800b0ded5c505868d62c81961"
        },
        "body_key": None,
        "body_type": "array",
        "mapping": {
            "latitude": "['position']['lat']",
            "longitude": "['position']['lng']",
            "location_name": "['name']",
            "number_of_bikes": "['available_bikes']",
            "number_of_stands": "['available_bike_stands']",
            "total_capacity": "['bike_stands']",
            "created_at": None,
            "updated_at": "['last_update']"
        }
    }
]
