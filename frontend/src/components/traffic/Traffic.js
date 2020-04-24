import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer} from "react-google-maps"

const TrafficGoogleMaps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 53.343786, lng: -6.255828 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 12.9885142, lng: 77.5477298 }} onClick={props.onMarkerClick} />}

    <TrafficLayer autoUpdate />
  </GoogleMap>
);

export default TrafficGoogleMaps
