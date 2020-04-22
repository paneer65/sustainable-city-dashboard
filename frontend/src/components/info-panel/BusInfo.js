import React from 'react';
import Card from 'react-bootstrap/Card'

export default class BusInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedMarker && (!prevProps.selectedMarker || this.props.selectedMarker.stop_id !== prevProps.selectedMarker.stop_id)) {
      this.setState({
        selectedMarker: this.props.selectedMarker
      });
    } else if (!this.props.selectedMarker && prevProps.selectedMarker){
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
              <p><b>Available Routes</b></p>
              <ul>
                {
                  this.state.selectedMarker.routes.map(route => (
                    <li>
                      { route }
                    </li>
                  ))
                }
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
