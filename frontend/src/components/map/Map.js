import React from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const defaultLocation = { lat: 53.343786, lng: -6.255828 };
const defaultZoomLevel = 11;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOjyfAl22KFpq0czq_I0sbRtJHKEkwdIc";
const pollutionURL = "https://api.openaq.org/v1/latest?coordinates=53.34399,-6.26719&radius=10000&order_by=distance";

class Map extends React.Component {
	constructor(props) {
    super(props)
    this.state = {
      pollutionData: [],
      selectedMarker: false,
			selectedFilter: '',
    }
  }

  componentDidUpdate(prevProps) {
		// Need to check state selectedFilter otherwise this will be an infinite loop
		if (this.props.selectedFilter === 'Pollution' && prevProps.selectedFilter !== 'Pollution') {
	    	this.fetchPollutionMapData();
		}
  }

  	airQualityCalculator(data) {
		for ( var key in data.results ) {
			var pollutionLevel = 'Low';
			var hazardousPollutant = "";
			for ( var pollutantData in data.results[key]["measurements"] ) {
				var pollutantValue = data.results[key]["measurements"][pollutantData]["value"]
				var parameter = data.results[key]["measurements"][pollutantData]["parameter"]
				switch ( parameter ) {

					case "o3":
						if ( pollutantValue >= 101 && pollutantValue <= 187 ) {
							if ( pollutionLevel != 'High')
								pollutionLevel = 'Medium';
						}
						else if ( pollutantValue >= 188 ) {
							pollutionLevel = 'High';
							hazardousPollutant = parameter ;
						}
						else 
							continue;

					case "so2":
						if ( pollutantValue >= 267 && pollutantValue <= 710 ) {
							if ( pollutionLevel != 'High')
								pollutionLevel = 'Medium';
						}
						else if ( pollutantValue >= 711 ) {
							pollutionLevel = 'High';
							hazardousPollutant = parameter ;
						}
						else 
							continue;

					case "no2":
						if ( pollutantValue >= 201 && pollutantValue <= 467 ) {
							if ( pollutionLevel != 'High')
								pollutionLevel = 'Medium';
						}
						else if ( pollutantValue >= 468 ) {
							pollutionLevel = 'High';
							hazardousPollutant = parameter ;
						}
						else 
							continue;

					case "pm25":
						if ( pollutantValue >= 36 && pollutantValue <= 58 ) {
							if ( pollutionLevel != 'High')
								pollutionLevel = 'Medium';
						}
						else if ( pollutantValue >= 59 ) {
							pollutionLevel = 'High';
							hazardousPollutant = parameter ;
						}
						else 
							continue;
		
					case "pm10":
						if ( pollutantValue >= 51 && pollutantValue <= 83 ) {
							if ( pollutionLevel != 'High')
								pollutionLevel = 'Medium';
						}
						else if ( pollutantValue >= 84 ) {
							pollutionLevel = 'High';
							hazardousPollutant = parameter ;
						}
						else 
							continue;
				

					default: continue;
				}
			}
			data.results[key]["pollutionLevel"] = pollutionLevel
			data.results[key]["hazardousPollutant"] = hazardousPollutant
			data.results[key]["markerKey"] = key
		}
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
			          <Marker
			            key={marker.location}
			            onClick={onClick}
			            position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
								>
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
