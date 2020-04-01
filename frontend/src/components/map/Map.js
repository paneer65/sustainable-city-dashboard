import React from "react"
import * as _ from 'underscore';
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import axios from "axios"
import TrafficGoogleMaps from "../traffic/Traffic"

const defaultLocation = { lat: 53.343786, lng: -6.255828 };
const defaultZoomLevel = 11;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc";
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
      bikesData: [],
  		selectedFilter: '',
    }
  }

	componentDidUpdate(prevProps) {
		// Need to check state selectedFilter otherwise this will be an infinite loop
		if (this.props.selectedFilter === 'Pollution' && prevProps.selectedFilter !== 'Pollution') {
			this.fetchPollutionMapData();
		} else if (this.props.selectedFilter === 'Bikes' && prevProps.selectedFilter !== 'Bikes') {
			this.fetchBikesMapData();
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
	 	let keys = Object.keys(data);
		let name = data[0]['location_name'];
		let all = []
		let arr = {}
    let count =0;
    let i =1;

    for(var key in keys)
		{
			if(data[key]['location_name']===name)
			{
				arr [data[key]['parameter']] = data[key]['value'];
				count++;
			}
			else
			{
				arr['location_name'] = name;
				arr['id'] = i;
        arr['latitude'] = parseFloat(data[key-1]['latitude']);
        arr['longitude'] = parseFloat(data[key-1]['longitude'])
				//all[name] = arr;
				all.push(arr);
				name = data[key]['location_name'];
				count = 0;
				arr = {}
				i++;
			}
		}
		arr['location_name'] = name;
		arr['id'] = i;
    arr['latitude'] = parseFloat(data[key-1]['latitude']);
    arr['longitude'] = parseFloat(data[key-1]['longitude'])

		all.push(arr)

    return all;
	}

	fetchPollutionMapData() {
		axios({
			url: '/api/pollution/',
			method: 'GET'
		}).then((response) => {
			if(response.status === 200) {
				//debugger
				const updatedData = this.airQualityCalculator(response.data)
				//const newdata = _.uniq(response.data,function(p){return p.location_name});
				this.setState({ pollutionData: updatedData})
				console.log(updatedData);
			}
		});
	}

  fetchBikesMapData() {
    axios({
      url: '/api/bikes/',
      method: 'GET'
    }).then((response) => {
      if(response.status === 200) {
        this.setState({ bikesData: response.data })
      }
    });
	}

	handleClick(marker, event) {
		this.setState({ selectedMarker: marker });
    this.props.updateSelectedMarker(marker);
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
								<Marker	key={marker.id}
										onClick={onClick}
										position={{ lat: marker.latitude, lng: marker.longitude }}>
								{
									props.selectedMarker === marker &&
									<InfoWindow>
										<div>
											<h4>{marker.location_name}</h4>
											{marker.so2} <br/>
											{marker.co}
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

  generateBikesMap() {
		return compose(withScriptjs, withGoogleMap)(props => {
		  	return (
				<GoogleMap defaultZoom={ defaultZoomLevel } defaultCenter={ defaultLocation }>
				{
						props.markers.map(marker => {
							const onClick = props.onClick.bind(this, marker)
							return (
								<Marker	key={marker.location_name}
										onClick={onClick}
										position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}>
								{
									props.selectedMarker === marker &&
									<InfoWindow>
										<div>
											<h4>{marker.location_name}</h4>
                      <span> Number of bikes : {marker.number_of_bikes} </span>
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

	generateTrafficMap(){
		return TrafficGoogleMaps
	}

	render() {
		if (this.props.selectedFilter === 'Pollution') {
			const PollutionMap = this.generatePollutionMap();
			return (
				<PollutionMap
				selectedMarker={ this.props.selectedMarker }
				markers={ this.state.pollutionData }
				onClick={ this.handleClick }
				googleMapURL={ googleMapURL }
				loadingElement={<div style= {{ height: `100%` }} />}
				containerElement={<div style= {{ height: `100%` }} />}
				mapElement={<div style = {{ height: `100%` }} />}
    		/>
			)
		} else if (this.props.selectedFilter === 'Bikes') {
      const BikesMap = this.generateBikesMap();
			return (
				<BikesMap
          selectedMarker={ this.props.selectedMarker }
		      markers={ this.state.bikesData }
		      onClick={ this.handleClick }
		      googleMapURL={ googleMapURL }
		      loadingElement={<div style= {{ height: `100%` }} />}
		      containerElement={<div style= {{ height: `100%` }} />}
		      mapElement={<div style = {{ height: `100%` }} />}
    		/>
			)
    	} else if (this.props.selectedFilter === 'Traffic') {
			const TrafficMap = this.generateTrafficMap();
				  return (
					  <TrafficMap
				selectedMarker={ this.props.selectedMarker }
					markers={ this.state.bikesData }
					onClick={ this.handleClick }
					googleMapURL={ googleMapURL }
					loadingElement={<div style= {{ height: `100%` }} />}
					containerElement={<div style= {{ height: `100%` }} />}
					mapElement={<div style = {{ height: `100%` }} />}
				  />
				  )
		}

		else {
			const WrappedMap = withScriptjs(withGoogleMap(this.googleMapInit))
			return (
				<WrappedMap
					googleMapURL = { googleMapURL }
					loadingElement={<div style = {{ height: "100%"}} />}
					containerElement={<div style = {{ height: "100%"}} />}
					mapElement={<div style = {{ height: "100%"}} />}
				/>
			)
		}
	}
}

export default Map;
