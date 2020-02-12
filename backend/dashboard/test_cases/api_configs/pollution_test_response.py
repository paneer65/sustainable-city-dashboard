"""
Sample response for pollution API
"""

POLLUTION_RESPONSE = {
    "meta":{
        "name":"openaq-api",
        "license":"CC BY 4.0",
        "website":"https://docs.openaq.org/",
        "page":1,
        "limit":100,
        "found":12
    },
    "results":[
        {
            "id":"IE-1",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Ireland Air Quality",
                "Dublin City"
            ],
            "location":"IE0105A",
            "locations":[
                "Dublin Coleraine Street",
                "IE0105A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.26667,
                "latitude":53.34722
            },
            "firstUpdated":"2016-12-10T21:00:00.000Z",
            "lastUpdated":"2018-04-30T17:00:00.000Z",
            "parameters":[
                "co",
                "no2",
                "so2"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"co",
                    "count":4629
                },
                {
                    "parameter":"no2",
                    "count":5602
                },
                {
                    "parameter":"so2",
                    "count":3195
                }
            ],
            "count":13426,
            "distance":361.14000466
        },
        {
            "id":"IE-4",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Ireland Air Quality",
                "Dublin City"
            ],
            "location":"IE0028A",
            "locations":[
                "Dublin Rathmines Wynnefield Road",
                "IE0028A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.27806,
                "latitude":53.35389
            },
            "firstUpdated":"2016-12-11T07:00:00.000Z",
            "lastUpdated":"2020-02-11T17:00:00.000Z",
            "parameters":[
                "no2",
                "o3",
                "pm10",
                "pm25",
                "so2"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"no2",
                    "count":14572
                },
                {
                    "parameter":"o3",
                    "count":14514
                },
                {
                    "parameter":"pm10",
                    "count":14891
                },
                {
                    "parameter":"pm25",
                    "count":14675
                },
                {
                    "parameter":"so2",
                    "count":11232
                }
            ],
            "count":69884,
            "distance":1318.32074389
        },
        {
            "id":"IE-2",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Ireland Air Quality",
                "Dublin City"
            ],
            "location":"IE0098A",
            "locations":[
                "Dublin Winetavern Street",
                "IE0098A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.28889,
                "latitude":53.34167
            },
            "firstUpdated":"2016-12-10T22:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "co",
                "no2",
                "so2"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"co",
                    "count":15876
                },
                {
                    "parameter":"no2",
                    "count":11268
                },
                {
                    "parameter":"so2",
                    "count":11754
                }
            ],
            "count":38898,
            "distance":1468.19350198
        },
        {
            "id":"IE-26",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Dublin City"
            ],
            "location":"IE001AP",
            "locations":[
                "IE001AP"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.30902,
                "latitude":53.3363
            },
            "firstUpdated":"2019-01-16T16:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "pm10"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"pm10",
                    "count":8250
                }
            ],
            "count":8250,
            "distance":2914.71049788
        },
        {
            "id":"IE-8",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Ireland Air Quality",
                "Dublin City"
            ],
            "location":"IE0127A",
            "locations":[
                "Dublin Clonskeagh Road Richview",
                "IE0127A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.24917,
                "latitude":53.31389
            },
            "firstUpdated":"2016-12-11T07:00:00.000Z",
            "lastUpdated":"2020-02-12T06:00:00.000Z",
            "parameters":[
                "o3"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"o3",
                    "count":15332
                }
            ],
            "count":15332,
            "distance":3558.55088063
        },
        {
            "id":"IE-25",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Dublin City"
            ],
            "location":"IE003AP",
            "locations":[
                "IE003AP"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.30527,
                "latitude":53.39025
            },
            "firstUpdated":"2019-01-16T15:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "pm10",
                "pm25"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"pm10",
                    "count":7090
                },
                {
                    "parameter":"pm25",
                    "count":7082
                }
            ],
            "count":14172,
            "distance":5738.61451181
        },
        {
            "id":"IE-23",
            "country":"IE",
            "city":"South Dublin",
            "cities":[
                "South Dublin"
            ],
            "location":"IE0095A",
            "locations":[
                "IE0095A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.36667,
                "latitude":53.35278
            },
            "firstUpdated":"2019-01-16T15:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "pm10"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"pm10",
                    "count":6996
                }
            ],
            "count":6996,
            "distance":6696.76361183
        },
        {
            "id":"IE-20",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Dublin City"
            ],
            "location":"IE0036A",
            "locations":[
                "IE0036A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.36667,
                "latitude":53.33333
            },
            "firstUpdated":"2019-01-15T17:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "no2",
                "pm10"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"no2",
                    "count":8349
                },
                {
                    "parameter":"pm10",
                    "count":8425
                }
            ],
            "count":16774,
            "distance":6731.7988412
        },
        {
            "id":"IE-24",
            "country":"IE",
            "city":"Dublin City",
            "cities":[
                "Dublin City"
            ],
            "location":"IE002AP",
            "locations":[
                "IE002AP"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.17533,
                "latitude":53.37204
            },
            "firstUpdated":"2019-01-16T15:00:00.000Z",
            "lastUpdated":"2020-02-12T06:00:00.000Z",
            "parameters":[
                "pm10"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"pm10",
                    "count":7772
                }
            ],
            "count":7772,
            "distance":6866.73005072
        },
        {
            "id":"IE-11",
            "country":"IE",
            "city":"Dunlaoghaire-Rathdown",
            "cities":[
                "Ireland Air Quality",
                "Dunlaoghaire-Rathdown"
            ],
            "location":"IE0140A",
            "locations":[
                "Dublin Swords Watery Lane",
                "IE0140A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.22237,
                "latitude":53.27481
            },
            "firstUpdated":"2016-12-11T07:00:00.000Z",
            "lastUpdated":"2020-02-12T08:00:00.000Z",
            "parameters":[
                "no2",
                "o3"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"no2",
                    "count":15674
                },
                {
                    "parameter":"o3",
                    "count":16182
                }
            ],
            "count":31856,
            "distance":8258.50067042
        },
        {
            "id":"IE-18",
            "country":"IE",
            "city":"Fingal",
            "cities":[
                "Fingal"
            ],
            "location":"IE0131A",
            "locations":[
                "IE0131A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.36993,
                "latitude":53.38564
            },
            "firstUpdated":"2019-01-15T17:00:00.000Z",
            "lastUpdated":"2020-02-12T00:00:00.000Z",
            "parameters":[
                "no2"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"no2",
                    "count":7036
                }
            ],
            "count":7036,
            "distance":8262.19596314
        },
        {
            "id":"IE-21",
            "country":"IE",
            "city":"South Dublin",
            "cities":[
                "South Dublin"
            ],
            "location":"IE0136A",
            "locations":[
                "IE0136A"
            ],
            "sourceName":"EEA Ireland",
            "sourceNames":[
                "EEA Ireland"
            ],
            "sourceType":"government",
            "sourceTypes":[
                "government"
            ],
            "coordinates":{
                "longitude":-6.35861,
                "latitude":53.28
            },
            "firstUpdated":"2019-01-15T17:00:00.000Z",
            "lastUpdated":"2019-09-02T20:00:00.000Z",
            "parameters":[
                "so2"
            ],
            "countsByMeasurement":[
                {
                    "parameter":"so2",
                    "count":3608
                }
            ],
            "count":3608,
            "distance":9372.61067405
        }
    ]
}
