import React from 'react';
import Map from '../map/Map';
import LocationLineChart from '../reporting/LocationLineChart';
import NavigationBar from '../navigationbar/NavigationBar';
import Filters from '../filters/Filters';
import FilterActions from '../filter-actions/FilterActions';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUnmount() {
    this._isMounted = false;
  }

  updateSelectedFilter(newFilter) {
    this.setState({ selectedFilter: newFilter });
  }

  updateSelectedMarker(newMarker) {
    this.setState({ selectedMarker: newMarker });
  }

  render() {
    return (
  		<div>
  			<NavigationBar />
        <Container fluid={ true }>
          <Row>
            <Col md={ 2 }>
              <Filters selectedFilter={ this.state.selectedFilter } updateSelectedFilter={ this.updateSelectedFilter }/>
            </Col>
            <Col md={ 7 }>
        			<div className="maps">
      					<div style = {{ height: "75vh"}}>
      						<Map
                    selectedFilter={this.state.selectedFilter}
                    updateSelectedMarker={this.updateSelectedMarker}
                  />
      					</div>
        			</div>
              <div className="reports">
                <h1> Reports </h1>
                <LocationLineChart
                  selectedMarker={this.state.selectedMarker}
                  dataModel={this.state.selectedFilter}
                />
              </div>
            </Col>
            <Col md={ 3 }>
              <FilterActions selectedFilter={ this.state.selectedFilter }/>
            </Col>
          </Row>
        </Container>
  		</div>
    );
  }
}

export default Dashboard
