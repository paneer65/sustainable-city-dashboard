"""
Mappings for News apis
"""

NEWS_API_MAPPING = [
    {
        "id": 1,
        "api_name": "NewsAPI",
        "url": "https://newsapi.org/v2/top-headlines",
        "method": "GET",
        "parameters": {
            "country" : "ie",
            "apiKey" : "baad5120e8a24afa9a7279468c6bb016",
        },
        "body_key": "['articles']",
        "body_type": "array",
        "mapping": {
            "source": "['source']['name']",
            "title": "['title']",
            "description": "['description']",
            "url": "['url']",
            "url_to_image": "['urlToImage']",
            "published_at": "['publishedAt']"
        }
    }
]
