"""
Mappings for pollution apis
"""

POLLUTION_API_MAPPING = [
    {
        "id": 1,
        "api_name": "OpenAQ Pollution",
        "url": "https://api.openaq.org/v1/locations",
        "parameters": [
            {
                "coordinates" : "53.34399,-6.26719",
                "radius" : "1000",
            }
        ],
        "body_key": "results",
        "body_type": "array",
        "mapping": {
            "latitude": "['coordinates']['latitude']",
            "longitude": "['coordinates']['longitude']",
            "location_name": "['location']",
            "parameter": "['parameters']",
            "value": "['count']",
            "created_at": "['firstUpdated']",
            "updated_at": "['lastUpdated']",
        }
    }
]
