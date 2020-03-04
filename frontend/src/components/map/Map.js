import React from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import MapDirectionsRenderer from '../map/MapDirectionsRenderer';

const defaultLocation = { lat: 53.343786, lng: -6.255828 };
const defaultZoomLevel = 11;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc";
const pollutionURL = "https://api.openaq.org/v1/latest?coordinates=53.34399,-6.26719&radius=10000&order_by=distance";
const trafficURL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=53.34399%2C-6.26719&unit=KMPH&openLr=true&key=KSmAdYLDIAGrvX18uWxmyhYHx9SKk8Uo";
const ozoneWeight = 0.3;
const sulphurDioxideWeight = 0.15;
const nitrogenDioxideWeight = 0.10;
const particleMatter25Weight = 0.20;
const particleMatter10Weight = 0.20;
const carbonMonoxideWright = 0.5;

class Map extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
		pollutionData: [],
		trafficData: [],
		selectedMarker: false,
		selectedFilter: '',
    }
  }

	componentDidUpdate(prevProps) {
		// Need to check state selectedFilter otherwise this will be an infinite loop
		if (this.props.selectedFilter === 'Pollution' && prevProps.selectedFilter !== 'Pollution') {
			this.fetchPollutionMapData();
		}
		if (this.props.selectedFilter === 'Traffic' && prevProps.selectedFilter !== 'Traffic') {
			this.fetchTrafficData();
		}
	}

	normalizeMapValues(mapTobeNormalized, listOfValues) { 
		let pollutantMap = new Map(mapTobeNormalized);
		let mapValues = Object.values(pollutantMap.props);
		let maxValue = Math.max.apply(null, listOfValues);
		let minValue = Math.min.apply(null, listOfValues);
		let normalisedMap = new Map();
		mapValues.map((value, key) => {
			if(typeof value === "number"){
				let normalizedValue = (value - minValue)/ (maxValue - minValue);
				normalisedMap[key] = normalizedValue;
			}
		});
		return normalisedMap;
	}


	airQualityCalculator(data) {
		let pollutionLevelMap = new Map();
		let pollutionLevelArray = new Array();
		let keys = Object.keys(data.results);
		for ( var key in keys ) {
			var pollutionLevel = 0;
			var hazardousPollutant = "";
			for ( var pollutantData in data.results[key]["measurements"] ) {
				var pollutantValue = data.results[key]["measurements"][pollutantData]["value"]
				var parameter = data.results[key]["measurements"][pollutantData]["parameter"]
				switch ( parameter ) {
					case "o3":
						pollutionLevel = pollutionLevel + ozoneWeight*pollutantValue;
						break

					case "so2":
						pollutionLevel = pollutionLevel + sulphurDioxideWeight*pollutantValue;
						break

					case "no2":
						pollutionLevel = pollutionLevel + nitrogenDioxideWeight*pollutantValue;
						break

					case "pm25":
						pollutionLevel = pollutionLevel + particleMatter25Weight*pollutantValue;
						break

					case "pm10":
						pollutionLevel = pollutionLevel + particleMatter10Weight*pollutantValue;
						break

					case "co":
						pollutionLevel = pollutionLevel + carbonMonoxideWright*pollutantValue;
						break;

					default: 
						continue;
				}
			}
			pollutionLevelMap[key] = pollutionLevel;
			pollutionLevelArray.push(pollutionLevel);
			data.results[key]["hazardousPollutant"] = hazardousPollutant;
			data.results[key]["markerKey"] = key;
			//data.results[key]["pollutionLevel"] = 0;
		}
		let normalizedPollutantLevelMap = new Map(this.normalizeMapValues(pollutionLevelMap, pollutionLevelArray));
		for (const [key, value] of Object.entries(normalizedPollutantLevelMap.props)) {
			if(typeof value === "number"){
				data.results[key]["pollutionLevel"] = value;
			}
		}
		debugger;
		return data
	}

	fetchPollutionMapData() {
		fetch(pollutionURL)
			.then(r => r.json())
			.then(data => {
				const updatedData = this.airQualityCalculator(data)
				this.setState({ pollutionData: updatedData.results })
		})
	}

	fetchTrafficData() {
		fetch(trafficURL)
			.then(r => r.json())
			.then(data => {
				//const updatedData = this.airQualityCalculator(data)
				this.setState({ trafficData: data })
				console.log(data.flowSegmentData.coordinates.coordinate)
		})
	}

	handleClick(marker, event) {
		this.setState({ selectedMarker: marker });
	}

	googleMapInit() {
		return (
			<GoogleMap defaultZoom = { defaultZoomLevel } defaultCenter = { defaultLocation } />
		)
	}

	generatePollutionMap() {
		return compose(withScriptjs, withGoogleMap)(props => {
		  	return (
				<GoogleMap defaultZoom={ defaultZoomLevel } defaultCenter={ defaultLocation }>
				{
					props.markers.map(marker => {
						const onClick = props.onClick.bind(this, marker)
						return (
							<Marker	key={marker.location}
									onClick={onClick}
									position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}>
							{
								props.selectedMarker === marker &&
								<InfoWindow>
									<div>
										<h4>{marker.location}</h4>
										{marker.pollutionLevel} <br/>
										{marker.hazardousPollutant}
									</div>
								</InfoWindow>
							}
							</Marker>
						)
					})
				}
				</GoogleMap>
		  	)
		});
	}

	generateTrafficMap() {
		return compose(withScriptjs, withGoogleMap)(props => {
			return (
				<GoogleMap defaultZoom={ defaultZoomLevel } defaultCenter={ defaultLocation }>
				{
					props.markers.map( marker => {
						const onClick = props.onClick.bind(this, marker)
						return (
							<MapDirectionsRenderer places= {marker.flowSegmentData.coordinates.coordinate} travelMode={window.google.maps.TravelMode.DRIVING} />
							/*<Marker	key={marker.location}
									onClick={onClick}
									position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}>
							{
								props.selectedMarker === marker &&
								<InfoWindow>
									<div>
										<h4>{marker.location}</h4>
										{marker.pollutionLevel} <br/>
										{marker.hazardousPollutant}
									</div>
								</InfoWindow>
							}
							</Marker>*/
						)
					})
				}

				</GoogleMap>
			)
	  });
	}

	render() {
		if (this.props.selectedFilter === 'Pollution') {
			const PollutionMap = this.generatePollutionMap();
			return (
				<PollutionMap
				selectedMarker={ this.state.selectedMarker }
				markers={ this.state.pollutionData }
				onClick={ this.handleClick }
				googleMapURL={ googleMapURL }
				loadingElement={<div style= {{ height: `100%` }} />}
				containerElement={<div style= {{ height: `100%` }} />}
				mapElement={<div style = {{ height: `100%` }} />}
	      		/>
			)
		}

		else {
			const TrafficMap = this.generateTrafficMap();
			return (
				<TrafficMap
				selectedMarker={ this.state.selectedMarker }
				markers={ this.state.trafficData}
				onClick={ this.handleClick }
				googleMapURL={ googleMapURL }
				loadingElement={<div style= {{ height: `100%` }} />}
				containerElement={<div style= {{ height: `100%` }} />}
				mapElement={<div style = {{ height: `100%` }} />}
	      		/>
			)
		}
	}
}

export default Map;
