import React from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import moment from 'moment';

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
      }
  }

  formatXAxis(tickItem) {
    return moment(tickItem).format('DD/MM/YY')
  }

  render() {
    let chartHTML = this.state.chartData.map((chart) => {
      return (
        <LineChart
          width={700}
          height={450}
          data={chart.data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="x" tickFormatter={this.formatXAxis}/>
          <YAxis label={{ value: chart.yLabel, angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="y" stroke="#ff7300" yAxisId={0} />
        </LineChart>
      )
    });

    return (
      <div>
        { chartHTML }
      </div>
    )
  }
}
