import React from 'react';
import Card from 'react-bootstrap/Card'

export default class PollutionInfo extends React.Component {

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
