import React from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import moment from 'moment';

import "./style.css"

const POLLUTION_PARAMS = ['o3', 'so2', 'no2', 'pm25', 'co'];
const BIKES_PARAMS = ['number_of_bikes', 'number_of_stands'];

export default class LocationLineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: [],
      modelParameters: []
    }
  }

  fetchChartData(modelParams) {
    modelParams.forEach((param) => {
      let postData = {
        coordinates: {
          latitude: this.props.selectedMarker.latitude,
          longitude: this.props.selectedMarker.longitude
        },
        model: this.props.dataModel,
        parameters: {
          parameter: param
        }
      }

      axios({
        url: '/reports/line_chart/',
        method: 'POST',
        data: JSON.stringify(postData)
      }).then((response) => {
        if(response.status === 200) {
          let chartData = this.state.chartData;
          chartData.push({
            data: response.data.chart_data,
            forecast: response.data.forecast_data,
            yLabel: param
          });

          this.setState({ 'chartData': chartData });
        }
      });
    });

  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedMarker && (!prevProps.selectedMarker || prevProps.selectedMarker.location !== this.props.selectedMarker.location)) {
      if (this.props.dataModel === 'Pollution') {
        this.fetchChartData(POLLUTION_PARAMS);
      } else if (this.props.dataModel === 'Bikes') {
        this.fetchChartData(BIKES_PARAMS);
      }
    } else if (!this.props.selectedMarker && (this.props.dataModel !== prevProps.dataModel)) {
      this.setState({ chartData: [] });
    } else if (this.props.dataModel === 'Pollution' && this.props.selectedMarker !== null) {
      this.fetchChartData(POLLUTION_PARAMS);
    }
  }

  formatXAxis(tickItem) {
    return moment(tickItem).format('DD/MM/YY');
  }

  render() {
    let chartHTML = this.state.chartData.map((chart) => {
      if (chart.data.length > 0) {
        let data = chart.data;
        if (chart.forecast.length > 0) {
          data = data.concat(chart.forecast);
        }

        return (
          <LineChart
            width={700}
            height={450}
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="x" tickFormatter={this.formatXAxis}/>
            <YAxis label={{ value: chart.yLabel, angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="y" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="y_forecast" stroke="#000" yAxisId={0} />
          </LineChart>
        )
      }

    });

    return (
      <div class="report-container">
        <h1>Reports</h1>
        { chartHTML }
      </div>
    )
  }
}
