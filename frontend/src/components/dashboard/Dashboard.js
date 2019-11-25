import React from 'react';
import Traffic from '../traffic/Traffic';
import './Dashboard.css';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import PeerConnector from '../PeerConnector/PeerConnector'
const tcdLocation = { lat: 53.343786, lng: -6.255828 };
const zoomLevel = 18;

class View extends React.Component {
	constructor(props) {
		super(props);
		let connector = new PeerConnector()
	}

	render() {
	  return (
			<Card className="bootstrap-card">
				<Button variant="primary"> {this.props.name}</Button>
				<Card.Body>
					<Traffic/>
				</Card.Body>
			</Card>
			);
		}
  }


function Map(){
	return (
		<GoogleMap defaultZoom = {zoomLevel} defaultCenter = { tcdLocation } />
	);
}

function Dashboard() {
	const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
		<div className = "Dashboard">
			<div  className = "home">
				<div className="header">
					Sustainable City Management
				</div>
					<div className="nav">
						<div class="btn-container" role="group" aria-label="Basic example">
							<button type="button" style={{margin:"30px"}} class="btn btn-outline-info">Home</button>
							<button type="button" class="btn btn-outline-info">Logout</button>
						</div>
					</div>
			</div>
			<div  className = "traffic">
				<View name="Traffic Management" />;
			</div>

			<div  className = "pollution">
				<View name="Pollution Control" />;
			</div>
			<div  className = "environment">
				<View name="Environment Control" />;
			</div>
			<div  className = "speed">
				<View name="Speed Management" />;
			</div>

			<div className="maps">
				<center>
					<div style = {{ width: "25vw", height: "32vh"}}>
						<WrappedMap googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc`}
							loadingElement = {<div style = {{ height: "100%"}} />}
							containerElement = {<div style = {{ height: "100%"}} />}
							mapElement = {<div style = {{ height: "100%"}} />}
						/>
					</div>
				</center>
			</div>
		</div>
  );
}

export default  Dashboard;
