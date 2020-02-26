"""
The CACHER module!
"""

from django.core.cache import cache
from django.contrib.auth.models import User

CACHE_KEYS = {
    'all_users': 'all_users'
}

class TheCacher():
    """ Mehtods to get cached models """
    def reset_all_cached_users(self):
        """Reset users cache on model change"""
        cache.delete(CACHE_KEYS['all_users'])

    def get_all_cached_users(self):
        """Get all cached users"""
        users = cache.get(CACHE_KEYS['all_users'])
        #import pdb; pdb.set_trace()
        if not users:
            users = User.objects.all()
            cache.set(CACHE_KEYS['all_users'], users)

        return users
