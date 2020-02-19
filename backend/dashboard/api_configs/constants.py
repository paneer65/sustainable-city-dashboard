"""
API Configs constants
"""

from dashboard.api_configs.pollution_api_mapping import POLLUTION_API_MAPPING
from dashboard.api_configs.bikes_api_mapping import BIKES_API_MAPPING
API_TYPE_CLASS_MAP = {
    'pollution': {
        'model': 'PollutionAPIData',
        'translation': POLLUTION_API_MAPPING
    },
    'bikes': {
        'model': 'BikesAPIData',
        'translation':BIKES_API_MAPPING
    }

}
