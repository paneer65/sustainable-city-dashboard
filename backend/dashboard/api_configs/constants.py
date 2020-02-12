"""
API Configs constants
"""

from dashboard.api_configs.pollution_api_mapping import POLLUTION_API_MAPPING

API_TYPE_CLASS_MAP = {
    'pollution': {
        'model': 'PollutionAPIData',
        'traslation': POLLUTION_API_MAPPING
    }
}
