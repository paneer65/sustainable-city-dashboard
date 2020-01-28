import React from 'react';
import PollutionActions from './PollutionActions';
import TrafficActions from './TrafficActions';

class FilterActions extends React.Component {
  render() {
    let actionModule;
    if (this.props.selectedFilter === 'Traffic') {
      actionModule = <TrafficActions />
    } else if (this.props.selectedFilter === 'Pollution') {
      actionModule = <PollutionActions />
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
