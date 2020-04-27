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
const ozoneWeight = 0.3;
const sulphurDioxideWeight = 0.15;
const nitrogenDioxideWeight = 0.10;
const particleMatter25Weight = 0.20;
const particleMatter10Weight = 0.20;
const carbonMonoxideWeight = 0.5;

class Map extends React.Component {
	constructor(props) {
    super(props)

    this.state = {
		pollutionData: [],
		predictedPollutionData: [],
		bikesData: [],
		busData: [],
		selectedFilter: '',
		pollutionSourcesMerged: false,
		mergedPollutionData: [],
		selectedMarker: '',
		eventsData: []
	}
}

  componentDidMount() {
    if(this.props.selectedFilter === 'Pollution' && this.state.predictedPollutionData.length > 0 && this.state.pollutionData.length > 0 && !this.state.pollutionSourcesMerged){
			this.mergeAndCategorizePollutionData();
		}

    if (this.props.selectedFilter === 'Pollution') {
			this.fetchPollutionMapData();
		} else if (this.props.selectedFilter === 'Bikes') {
			this.fetchBikesMapData();
		} else if (this.props.selectedFilter === 'Events'){
			this.fetchEventsData();
		} else if (this.props.selectedFilter === 'Bus') {
  		this.fetchBusMapData();
  	}
  }

	componentDidUpdate(prevProps) {
		// Need to check state selectedFilter otherwise this will be an infinite loop
		if(this.props.selectedFilter === 'Pollution' && this.state.predictedPollutionData.length > 0 && this.state.pollutionData.length > 0 && !this.state.pollutionSourcesMerged){
			this.mergeAndCategorizePollutionData();
		}
    if (this.props.selectedFilter === 'Pollution' && prevProps.selectedFilter !== 'Pollution') {
			this.fetchPollutionMapData();
		} else if (this.props.selectedFilter === 'Bikes' && prevProps.selectedFilter !== 'Bikes') {
			this.fetchBikesMapData();
		} else if (this.props.selectedFilter === 'Events' && prevProps.selectedFilter !== 'Events'){
			this.fetchEventsData();
		} else if (this.props.selectedFilter === 'Bus' && prevProps.selectedFilter !== 'Bus') {
  		this.fetchBusMapData();
  	}
	}

	updatePollutionAPIData(data) {
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
		return this.airQualityCalculator(all)
	}

	airQualityCalculator(data) {
		let keys = Object.keys(data);
		for ( var key in keys ) {
			var pollutionLevel = 0;
			let dataElement = data[key]
			if (dataElement.hasOwnProperty("o3"))
				pollutionLevel = pollutionLevel + ozoneWeight * dataElement["o3"];
			if (dataElement.hasOwnProperty("so2"))
				pollutionLevel = pollutionLevel + sulphurDioxideWeight * dataElement["so2"];
			if (dataElement.hasOwnProperty("no2"))
				pollutionLevel = pollutionLevel + nitrogenDioxideWeight * dataElement["no2"];
			if (dataElement.hasOwnProperty("pm25"))
				pollutionLevel = pollutionLevel + particleMatter25Weight * dataElement["pm25"];
			if (dataElement.hasOwnProperty("pm10"))
				pollutionLevel = pollutionLevel + particleMatter10Weight * dataElement["pm10"];
			if (dataElement.hasOwnProperty("co"))
				pollutionLevel = pollutionLevel + carbonMonoxideWeight * dataElement["co"];
			data[key]["pollution"] = pollutionLevel
		}
		return data
	}

	mergeAndCategorizePollutionData(){
		let pollutionData = this.state.pollutionData
		let predictedPollutionData = this.state.predictedPollutionData
		let mergedData = []
		for (let key in pollutionData) {
			if (pollutionData.hasOwnProperty(key)) {
				let pollution = pollutionData[key]
				pollution['icon'] = 'red-dot.png'
				pollution['id'] = mergedData.length
				mergedData.push(pollution)
			}
		}
		for (let key in predictedPollutionData) {
			if (predictedPollutionData.hasOwnProperty(key)) {
				let pollution = predictedPollutionData[key]
				pollution['icon'] = 'yellow-dot.png'
				pollution['id'] = mergedData.length
				mergedData.push(pollution)
			}
		}
		for (let key in mergedData) {
			if (mergedData.hasOwnProperty(key)) {
				if(mergedData[key]["pollution"] < 1)
					mergedData[key]["pollutionLevel"] = 'Low'
				else if(mergedData[key]["pollution"] < 2.5)
					mergedData[key]["pollutionLevel"] = 'Average'
				else
					mergedData[key]["pollutionLevel"] = 'High'
			}
		}
		this.setState({ mergedPollutionData: mergedData })
		this.setState({ pollutionSourcesMerged: true})
	}

	fetchPollutionMapData() {
		let updatedData = []
		axios({
			url: '/api/pollution/',
			method: 'GET'
		}).then((response) => {
			if(response.status === 200) {
				updatedData = this.updatePollutionAPIData(response.data)
				this.setState({ pollutionData: updatedData})
			}
		});
		this.fetchPredictedPollutionData()
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
			}
		});
	}

	fetchPredictedPollutionData() {
		axios({
		  url: '/api/mlmodel/',
		  method: 'GET'
		}).then((response) => {
		  if(response.status === 200) {
				let predictedPollution = response.data
				this.setState({ predictedPollutionData : predictedPollution })
				//this.forceUpdate();
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
							<Marker key = {marker.id}
									onClick={onClick}
									position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
									icon={{url:"http://maps.google.com/mapfiles/ms/icons/" + marker.icon}}>
							{
								props.selectedMarker === marker &&
								<InfoWindow>
									<div>
										<h4>{ marker.pollutionLevel }</h4>
										<span>{ marker.pollution }</span>
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
			//this.mergePollutionData(this.state.pollutionData, this.state.predictedPollutionData)
			return (
				<PollutionMap
				selectedMarker={ this.props.selectedMarker }
				markers={ this.state.mergedPollutionData }
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
