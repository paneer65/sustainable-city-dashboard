"""
Build Location line chart data
"""

import pandas as pd
from statsmodels.tsa.arima_model import ARIMA
from dashboard.tables.pollution_api_data import PollutionAPIData
from dashboard.tables.bikes_api_data import BikesAPIData

class LocationLineChart():
    """
    Line charts data specifically for a location
    """
    @staticmethod
    def build_line_chart_data(
                        model_type,
                        coordinates,
                        parameters,
                        date_filter,
                        predict_trendline=True
    ):
        """
        Build line chart for any model
        """
        if model_type == 'Pollution':
            line_chart_data = LocationLineChart.build_pollution_line_chart(
                coordinates,
                parameters,
                date_filter,
                predict_trendline
            )
        elif model_type == 'Bikes':
            line_chart_data = LocationLineChart.build_bikes_line_chart(
                coordinates,
                parameters,
                date_filter,
                predict_trendline
            )

        return line_chart_data

    @staticmethod
    def build_pollution_line_chart(coordinates, parameters, date_filter, predict_trendline):
        """
        Build line charts for pollution location reports
        """
        pollution_data = PollutionAPIData.objects.filter(
            latitude=coordinates['latitude'],
            longitude=coordinates['longitude'],
            parameter=parameters['parameter'],
            updated_at__gte=date_filter
        )

        chart_data = {
            'chart_data': [],
            'forecast_data': []
        }

        for data in pollution_data:
            chart_data['chart_data'].append({
                'x': data.updated_at,
                'y': data.value
            })

        if predict_trendline:
            chart_data['forecast_data'] = LocationLineChart.build_forecast_data(chart_data)

        return chart_data

    @staticmethod
    def build_bikes_line_chart(coordinates, parameters, date_filter, predict_trendline):
        """
        Build line charts for bikes reports
        """

        bikes_data = BikesAPIData.objects.filter(
            latitude=coordinates['latitude'],
            longitude=coordinates['longitude'],
            updated_at__gte=date_filter
        )

        chart_data = {
            'chart_data': [],
            'forecast_data': []
        }

        for data in bikes_data:
            chart_data['chart_data'].append({
                'x': data.updated_at,
                'y': getattr(data, parameters['parameter'])
            })

        if predict_trendline:
            chart_data['forecast_data'] = LocationLineChart.build_forecast_data(chart_data)

        return chart_data

    @staticmethod
    def build_forecast_data(chart_data):
        """
        Build forecast data using the ARIMA model
        """
        if len(chart_data['chart_data']) >= 10:
            chart_data_df = pd.DataFrame.from_dict(chart_data)
            chart_data_df.set_index('x')
            # chart_trend_data = chart_data_df['y'].rolling(
            #     window=30,
            #     center=True,
            #     min_periods=0
            # ).mean()
            model = ARIMA(chart_data_df['y'], order=(1, 0, 0))
            result_arima = model.fit(disp=0)
            forecast = result_arima.forecast(steps=5)[0]
        else:
            forecast = None

        return forecast
