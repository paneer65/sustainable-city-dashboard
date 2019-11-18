import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

const tcdLocation = { lat: 53.343786, lng: -6.255828 };
const zoomLevel = 18;

function Map(){
	return (
		<GoogleMap defaultZoom = {zoomLevel} defaultCenter = { tcdLocation } />
	);
}         

export default function Dashboard() {
	const WrappedMap = withScriptjs(withGoogleMap(Map));
	
	return (
		<div>
			<center>
				<div style = {{ width: "70vw", height: "70vh"}}>
					<WrappedMap googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc`}
						loadingElement = {<div style = {{ height: "100%"}} />}
						containerElement = {<div style = {{ height: "100%"}} />}
						mapElement = {<div style = {{ height: "100%"}} />}
					/>
				</div>
			</center>
		</div>
	)
}