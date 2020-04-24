import React from "react"
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
import { Dot } from "recharts"

const defaultLocation = { lat: 53.343786, lng: -6.255828 };
const defaultZoomLevel = 11;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc";

class Map extends React.Component {
	constructor(props) {
    super(props)

    this.state = {
    	pollutionData: [],
      busData: [],
    	bikesData: [],
  		selectedFilter: '',
  		selectedMarker: '',
  		eventsData: []
    }
  }

	componentDidUpdate(prevProps) {
		console.log(this.props.selectedFilter)
		// Need to check state selectedFilter otherwise this will be an infinite loop
		if (this.props.selectedFilter === 'Pollution' && prevProps.selectedFilter !== 'Pollution') {
			this.fetchPollutionMapData();
		} else if (this.props.selectedFilter === 'Bikes' && prevProps.selectedFilter !== 'Bikes') {
			this.fetchBikesMapData();
		} else if(this.props.selectedFilter === 'Events' && prevProps.selectedFilter !== 'Events'){
			this.fetchEventsData();
		} else if (this.props.selectedFilter === 'Bus' && prevProps.selectedFilter !== 'Bus') {
      this.fetchBusMapData();
    }
	}

	normalizeMapValues(mapTobeNormalized, listOfValues) {
		let pollutantMap = new Map(mapTobeNormalized);
		let mapValues = Object.values(pollutantMap.props);
		let maxValue = Math.max.apply(null, listOfValues);
		let minValue = Math.min.apply(null, listOfValues);

    mapValues.map((value, key) => {
			if(typeof value === "number"){
				let normalizedValue = (value - minValue)/ (maxValue - minValue);
				return normalizedValue;
			} else {
        return value;
      }
		});

		return mapValues;
	}

	airQualityCalculator(data) {
	 	let keys = Object.keys(data);
		let name = data[0]['location_name'];
		let all = []
		let arr = {}
    let count = 0;
    let i =1;

    for(var key in keys)
		{
			if(data[key]['location_name'] === name)
			{
				arr[data[key]['parameter']] = data[key]['value'];
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
			}
		});
	}


	eventsTimeKeeper(events) {
		const today = new Date();
		let timeString = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		for (let key in events) {
			if (events.hasOwnProperty(key)) {
				let currentEvent = events[key]

				//Events going on now
				if(timeString>currentEvent.starts_at && timeString<currentEvent.ends_at){
					let eventEndingHour = parseInt(currentEvent.ends_at.split(":")[0])
					let currentHour = parseInt(today.getHours())
					if(eventEndingHour-currentHour === 1)
						currentEvent['icon'] = 'green-dot.png'
					else
						currentEvent['icon'] = 'yellow-dot.png'
				}

				//Events going to start in an hour
				else if(timeString<currentEvent.starts_at){
					if(parseInt(currentEvent.starts_at.split(":")[0])-parseInt(today.getHours()) === 1)
						currentEvent['icon'] = 'red-dot.png'
					else
						currentEvent['icon'] = 'ltblue-dot.png'
				}
				else
					currentEvent['icon'] = 'blue-dot.png'
				events[key] = currentEvent
			}
		}
		this.props.updateAllMarkers(events);
		return events
	}


	fetchEventsData() {
		axios({
			url: '/events/',
			method: 'GET'
		}).then((response) => {
			if(response.status === 200) {
				const events = this.eventsTimeKeeper(response.data.events)
				this.setState({ eventsData: events})
				console.log(events);
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

  fetchBusMapData() {
    axios({
      url: '/api/bus/',
      method: 'GET'
    }).then((response) => {
      if(response.status === 200) {
        this.setState({ busData: response.data })
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
									this.props.selectedMarker === marker &&
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

	generateEventsMap() {
		return compose(withScriptjs, withGoogleMap)(props => {
		  	return (
				<GoogleMap defaultZoom={ defaultZoomLevel } defaultCenter={ defaultLocation }>
				{
						props.markers.map(marker => {
							const onClick = props.onClick.bind(this, marker)
							return (
								<Marker	key={marker.event_name}
										onClick={onClick}
										position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
										icon={{url:"http://maps.google.com/mapfiles/ms/icons/" + marker.icon}}>
								{
									this.props.selectedMarker === marker &&
									<InfoWindow>
										<div>
											<h4>{marker.event_type}</h4>
                      						<span> Name: {marker.event_name} </span><br/>
											<span> Speed Limit: {marker.speed_limit} </span>
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

  generateBusMap() {
		return compose(withScriptjs, withGoogleMap)(props => {
		  	return (
				<GoogleMap defaultZoom={ defaultZoomLevel } defaultCenter={ defaultLocation }>
				{
						props.markers.map(marker => {
							const onClick = props.onClick.bind(this, marker)
							return (
								<Marker	key={marker.stop_id + marker.location_name}
										onClick={onClick}
										position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}>
								{
									props.selectedMarker === marker
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
		}
		else if (this.props.selectedFilter === 'Bikes') {
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
      } else if (this.props.selectedFilter === 'Bus') {
        const BusMap = this.generateBusMap();
        return (
  				<BusMap
            selectedMarker={ this.props.selectedMarker }
  		      markers={ this.state.busData }
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
		else if (this.props.selectedFilter === 'Events') {
			const EventsMap = this.generateEventsMap();
				return (
					<EventsMap
						selectedMarker={ this.props.selectedMarker }
						markers={ this.state.eventsData }
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
