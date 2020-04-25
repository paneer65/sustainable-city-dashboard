import React from 'react';
import Card from 'react-bootstrap/Card'

export default class BikesInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedMarker && (!prevProps.selectedMarker || this.props.selectedMarker.location_name !== prevProps.selectedMarker.location_name)) {
      this.setState({
        selectedMarker: this.props.selectedMarker
      });
    } else if (!this.props.selectedMarker && prevProps.selectedMarker) {
      this.setState({
        selectedMarker: null
      });
    }
  }

  render() {
    if (this.state.selectedMarker) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{this.state.selectedMarker.location_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">({this.state.selectedMarker.latitude}, {this.state.selectedMarker.longitude})</Card.Subtitle>
              <p><b>Latest Information</b></p>
              <ul>
                <li>Number of bikes: {this.state.selectedMarker.number_of_bikes}</li>
                <li>Number of stands: {this.state.selectedMarker.number_of_stands}</li>
                <li>Total Capacity: {this.state.selectedMarker.total_capacity}</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return (
        <div>

        </div>
      );
    }
  }
}
