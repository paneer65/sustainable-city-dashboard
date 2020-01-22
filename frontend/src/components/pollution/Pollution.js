import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={11} defaultCenter={{ lat: 53.355, lng: -6.2555 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.locations}
                </div>
              </InfoWindow>}
            
          </Marker>
        )
      })}
    </GoogleMap>
  )
}
)

export default class Pollution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aqi: [],
      selectedMarker: false
    }
  }
  componentDidMount() {
    fetch("https://api.openaq.org/v1/locations?coordinates=53.34399,-6.26719&radius=10000&order_by=distance")
      .then(r => r.json())
      .then(data => {
        this.setState({ aqi: data.results })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.aqi}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}