import React from 'react';
import Map from '../map/Map';
import NavigationBar from '../navigationbar/NavigationBar';
import Filters from '../filters/Filters';
import './Dashboard.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Dashboard() {
  return (
		<div>
			<NavigationBar />
      <Container fluid={ true }>
        <Row>
          <Col md={ 2 }>
            <Filters />
          </Col>
          <Col>
      			<div className="maps">
    					<div style = {{ height: "75vh"}}>
    						<Map />
    					</div>
      			</div>
          </Col>
        </Row>
      </Container>
		</div>
  );
}

export default Dashboard
