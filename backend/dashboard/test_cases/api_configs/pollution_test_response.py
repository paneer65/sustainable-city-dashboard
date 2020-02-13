"""
Sample response for pollution API
"""
# Disable unused variable as eval is using the variable
# pylint: disable=bad-continuation,line-too-long

POLLUTION_RESPONSE = {
  "meta": {
    "name": "openaq-api",
    "license": "CC BY 4.0",
    "website": "https://docs.openaq.org/",
    "page": 1,
    "limit": 100,
    "found": 17
  },
  "results": [
    {
      "location": "Dublin Coleraine Street",
      "city": "Ireland Air Quality e-Reporting monitoring network for compliance and informative reporting",
      "country": "IE",
      "distance": 360.9469594821541,
      "measurements": [
        {
          "parameter": "so2",
          "value": 0,
          "lastUpdated": "2017-07-19T12:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "co",
          "value": 0.34542224,
          "lastUpdated": "2017-07-20T22:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "no2",
          "value": 0,
          "lastUpdated": "2017-07-20T22:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.34722,
        "longitude": -6.266667
      }
    },
    {
      "location": "IE0105A",
      "city": "Dublin City",
      "country": "IE",
      "distance": 360.9469594821541,
      "measurements": [
        {
          "parameter": "co",
          "value": 0.05735562,
          "lastUpdated": "2018-04-30T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "no2",
          "value": 61.52556,
          "lastUpdated": "2018-04-30T17:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "so2",
          "value": 1.4898617,
          "lastUpdated": "2018-04-30T17:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.34722,
        "longitude": -6.266667
      }
    },
    {
      "location": "IE0028A",
      "city": "Dublin City",
      "country": "IE",
      "distance": 1316.4780174918515,
      "measurements": [
        {
          "parameter": "o3",
          "value": 50.608887,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "no2",
          "value": 21.649496,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "so2",
          "value": 1.8649555,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm25",
          "value": 0.8689073,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm10",
          "value": 3.292922,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.35389,
        "longitude": -6.278056
      }
    },
    {
      "location": "Dublin Rathmines Wynnefield Road",
      "city": "Ireland Air Quality e-Reporting monitoring network for compliance and informative reporting",
      "country": "IE",
      "distance": 1316.4780174918515,
      "measurements": [
        {
          "parameter": "o3",
          "value": 18.05,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "no2",
          "value": 9.8365,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "so2",
          "value": 1.6625,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm25",
          "value": 0.377067,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm10",
          "value": 2.23853,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.35389,
        "longitude": -6.278056
      }
    },
    {
      "location": "Dublin Winetavern Street",
      "city": "Ireland Air Quality e-Reporting monitoring network for compliance and informative reporting",
      "country": "IE",
      "distance": 1463.9499049307096,
      "measurements": [
        {
          "parameter": "co",
          "value": 0.19805922,
          "lastUpdated": "2017-07-20T22:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "so2",
          "value": 0,
          "lastUpdated": "2017-07-20T22:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.341667,
        "longitude": -6.288889
      }
    },
    {
      "location": "IE0098A",
      "city": "Dublin City",
      "country": "IE",
      "distance": 1463.9499049307096,
      "measurements": [
        {
          "parameter": "no2",
          "value": 26.667847,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "co",
          "value": 0.232,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "so2",
          "value": 4.453037,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.341667,
        "longitude": -6.288889
      }
    },
    {
      "location": "IE001AP",
      "city": "Dublin City",
      "country": "IE",
      "distance": 2906.8167671541046,
      "measurements": [
        {
          "parameter": "pm10",
          "value": 11.126469,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.336296,
        "longitude": -6.30902
      }
    },
    {
      "location": "IE0127A",
      "city": "Dublin City",
      "country": "IE",
      "distance": 3555.6459485503874,
      "measurements": [
        {
          "parameter": "o3",
          "value": 52.754,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.31389,
        "longitude": -6.249167
      }
    },
    {
      "location": "Dublin Clonskeagh Road Richview",
      "city": "Ireland Air Quality e-Reporting monitoring network for compliance and informative reporting",
      "country": "IE",
      "distance": 3555.6459485503874,
      "measurements": [
        {
          "parameter": "o3",
          "value": 42.784,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.31389,
        "longitude": -6.249167
      }
    },
    {
      "location": "IE003AP",
      "city": "Dublin City",
      "country": "IE",
      "distance": 5732.555528828703,
      "measurements": [
        {
          "parameter": "pm10",
          "value": 6.601,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm25",
          "value": 4.19825,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.39025,
        "longitude": -6.305266
      }
    },
    {
      "location": "IE0095A",
      "city": "South Dublin",
      "country": "IE",
      "distance": 6677.083876135744,
      "measurements": [
        {
          "parameter": "pm10",
          "value": 4.21025,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.35278,
        "longitude": -6.366667
      }
    },
    {
      "location": "IE0036A",
      "city": "Dublin City",
      "country": "IE",
      "distance": 6712.139418386386,
      "measurements": [
        {
          "parameter": "no2",
          "value": 10.086922,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "pm10",
          "value": 4.603042,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.333332,
        "longitude": -6.366667
      }
    },
    {
      "location": "IE002AP",
      "city": "Dublin City",
      "country": "IE",
      "distance": 6850.236708947053,
      "measurements": [
        {
          "parameter": "pm10",
          "value": 5.508,
          "lastUpdated": "2020-02-13T12:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.372044,
        "longitude": -6.175326
      }
    },
    {
      "location": "IE0131A",
      "city": "Fingal",
      "country": "IE",
      "distance": 8243.863546837707,
      "measurements": [
        {
          "parameter": "no2",
          "value": 15.074436,
          "lastUpdated": "2020-02-13T12:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.385635,
        "longitude": -6.369934
      }
    },
    {
      "location": "Dublin Swords Watery Lane",
      "city": "Ireland Air Quality e-Reporting monitoring network for compliance and informative reporting",
      "country": "IE",
      "distance": 8251.363237697164,
      "measurements": [
        {
          "parameter": "o3",
          "value": 24.066666,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "no2",
          "value": 17.2855,
          "lastUpdated": "2017-07-20T21:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.27481,
        "longitude": -6.222367
      }
    },
    {
      "location": "IE0140A",
      "city": "Dunlaoghaire-Rathdown",
      "country": "IE",
      "distance": 8251.363237697164,
      "measurements": [
        {
          "parameter": "no2",
          "value": 7.885647,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        },
        {
          "parameter": "o3",
          "value": 62.137215,
          "lastUpdated": "2020-02-13T13:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.27481,
        "longitude": -6.222367
      }
    },
    {
      "location": "IE0136A",
      "city": "South Dublin",
      "country": "IE",
      "distance": 9357.911778795944,
      "measurements": [
        {
          "parameter": "so2",
          "value": 0,
          "lastUpdated": "2019-09-02T20:00:00.000Z",
          "unit": "µg/m³",
          "sourceName": "EEA Ireland",
          "averagingPeriod": {
            "value": 1,
            "unit": "hours"
          }
        }
      ],
      "coordinates": {
        "latitude": 53.28,
        "longitude": -6.358611
      }
    }
  ]
}
