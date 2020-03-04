"""
Report views
"""

import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from reports.chart_generators.location_line_chart import LocationLineChart

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def generate_location_line_chart_data(request):
    """
    Return line chart data to be used in frontend to generate a chart
    """
    model_type = request.data['model']
    coordinates = request.data['coordinates']
    parameters = request.data['parameters']
    # Date 30 days ago
    date_filter = datetime.datetime.now() - datetime.timedelta(30)

    chart_data = LocationLineChart.build_line_chart_data(
        model_type,
        coordinates,
        parameters,
        date_filter
    )

    return Response(chart_data, status=200)
