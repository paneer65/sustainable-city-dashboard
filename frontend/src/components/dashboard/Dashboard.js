import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Map from '../map/Map';
import NewsIndex from '../news';
import LocationLineChart from '../reporting/LocationLineChart';
import NavigationBar from '../navigationbar/NavigationBar';
import Filters from '../filters/Filters';
import FilterActions from '../filter-actions/FilterActions';
import InfoPanelIndex from '../info-panel';

import "./style.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'Traffic',
      selectedMarker: null
    };

    this.updateSelectedFilter = this.updateSelectedFilter.bind(this);
    this.updateSelectedMarker = this.updateSelectedMarker.bind(this);
  }

  updateSelectedFilter(newFilter) {
    this.setState({
      selectedFilter: newFilter,
      selectedMarker: null
    });
  }

  updateSelectedMarker(newMarker) {
    this.setState({ selectedMarker: newMarker });
  }

  render() {
    let mainView;
    if (this.state.selectedFilter !== 'News') {
      mainView =  <div style = {{ height: "60vh"}}>
                    <Map
                      selectedFilter={this.state.selectedFilter}
                      updateSelectedMarker={this.updateSelectedMarker}
                    />
                  </div>
    } else {
      mainView = <NewsIndex />
    }

    return (
  		<div>
  			<NavigationBar />
        <Container fluid={ true }>
          <Row>
            <Col md={ 2 }>
              <Filters selectedFilter={ this.state.selectedFilter } updateSelectedFilter={ this.updateSelectedFilter }/>
            </Col>
            <Col md={ 7 }>
        			<div className="mainView">
    						{ mainView }
        			</div>
            </Col>
            <Col md={ 3 }>
              <InfoPanelIndex selectedFilter={this.state.selectedFilter} selectedMarker={this.state.selectedMarker}/>
            </Col>
          </Row>
          <Row>
            <div className="reports">
              <LocationLineChart
                selectedMarker={this.state.selectedMarker}
                dataModel={this.state.selectedFilter}
              />
            </div>
          </Row>
        </Container>
  		</div>
    );
  }
}

export default Dashboard
