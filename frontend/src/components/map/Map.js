import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
const defaultLocation = { lat: 53.343786, lng: -6.255828 };
const defaultZoomLevel = 18;

function GoogleMapInit(){
	return (
		<GoogleMap defaultZoom = { defaultZoomLevel } defaultCenter = { defaultLocation } />
	)
}

function Map() {

  const WrappedMap = withScriptjs(withGoogleMap(GoogleMapInit))

  return (
    <WrappedMap googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc"
      loadingElement={<div style = {{ height: "100%"}} />}
      containerElement={<div style = {{ height: "100%"}} />}
      mapElement={<div style = {{ height: "100%"}} />}
    />
  )
}

export default Map
