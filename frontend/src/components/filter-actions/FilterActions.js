import React from 'react';
import PollutionActions from './PollutionActions';
import TrafficActions from './TrafficActions';
import EventActions from './EventActions';

class FilterActions extends React.Component {

  render() {
    let actionModule;
    if (this.props.selectedFilter === 'Traffic') {
      actionModule = <TrafficActions />
    } else if (this.props.selectedFilter === 'Pollution') {
      actionModule = <PollutionActions />
    } else if (this.props.selectedFilter === 'Events') {
      actionModule = <EventActions selectedMarker = {this.props.selectedMarker} updateSelectedMarker = { this.props.updateSelectedMarker } allMarkers = { this.props.allMarkers }/>
    }
    return (
      <div className="FilterActions">
        <h2>Actions</h2>
        { actionModule }
      </div>
    )
  }
}

export default FilterActions;
