"""
API Configs constants
"""

from dashboard.api_configs.pollution_api_mapping import POLLUTION_API_MAPPING
from dashboard.api_configs.bikes_api_mapping import BIKES_API_MAPPING
from dashboard.api_configs.bus_api_mapping import BUS_API_MAPPING
from dashboard.api_configs.news_api_mapping import NEWS_API_MAPPING

API_TYPE_CLASS_MAP = {
    'pollution': {
        'model': 'PollutionAPIData',
        'translation': POLLUTION_API_MAPPING
    },
    'bikes': {
        'model': 'BikesAPIData',
        'translation':BIKES_API_MAPPING
    },
    'bus': {
        'model': 'BusAPIData',
        'translation':BUS_API_MAPPING
    },
    'news': {
        'model': 'NewsAPIData',
        'translation':NEWS_API_MAPPING
    }
}
