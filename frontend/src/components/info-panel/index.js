import React from 'react';
import BikesInfo from './BikesInfo';
import PollutionInfo from './PollutionInfo';
import BusInfo from './BusInfo';

export default class InfoPanelIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
  		selectedFilter: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedFilter !== prevProps.selectedFilter) {
      this.setState({
        selectedMarker: null,
        selectedFilter: this.props.selectedFilter
      });
    } else if (this.props.selectedMarker && (!prevProps.selectedMarker || this.props.selectedMarker.location !== prevProps.selectedMarker.location)) {
      this.setState({
        selectedMarker: this.props.selectedMarker,
        selectedFilter: this.props.selectedFilter
      });
    }
  }

  render() {
    let infoModule;
    if (this.state.selectedFilter === 'Pollution') {
      infoModule = <PollutionInfo selectedMarker={this.state.selectedMarker}/>
    } else if (this.state.selectedFilter === 'Bikes') {
      infoModule = <BikesInfo selectedMarker={this.state.selectedMarker}/>
    } else if (this.state.selectedFilter === 'Bus') {
      infoModule = <BusInfo selectedMarker={this.state.selectedMarker}/>
    }

    return (
      <div>
        <h1> Info Panel </h1>
        <div>
          { infoModule }
        </div>
      </div>
    )
  }
}
