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
const pollutionURL = "https://api.openaq.org/v1/locations?coordinates=53.34399,-6.26719&radius=10000&order_by=distance";

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

	fetchPollutionMapData() {
		fetch(pollutionURL)
			.then(r => r.json())
			.then(data => {
				this.setState({ pollutionData: data.results })
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
			            key={marker.id}
			            onClick={onClick}
			            position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
								>
			          	{
										props.selectedMarker === marker &&
			              <InfoWindow>
			              	<div>
			              		<h4>{marker.locations}</h4>
			                  {marker.parameters}
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
