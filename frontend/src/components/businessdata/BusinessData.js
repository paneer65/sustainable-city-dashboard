import React from 'react';
import ReactDOM from 'react-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import {VictoryBar, VictoryChart, VictoryLine, VictoryClipContainer} from 'victory';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const modules_list = ['3 Months', '6 Months', '1 Year']
  export default class BusinessData extends React.Component
  {
    constructor(props) {
      super(props)
      this.state = {
        title : '',
        inputdata : {}
      }
    }
    render(){
      let modules_list_html = modules_list.map((element) =>
      {
        if (this.props.selectedFilter === element) {
          return (
            <ListGroup.Item as="li" active>
              <Button variant="info" onClick={ () => this.props.updateSelectedFilter(element) }>{ element }</Button>
            </ListGroup.Item>
          )
        } else {
          return (
            <ListGroup.Item as="li">
              <Button variant="info" onClick={ () => this.props.updateSelectedFilter(element) }>{ element }</Button>
            </ListGroup.Item>
          )
        }
      }
    )
      
      return (
      <Container margin="5px">
      <Row className="justify-content-md-center">
        <ListGroup horizontal as="ul" className="center">
          { modules_list_html }
        </ListGroup>
      
        </Row>
      <Row>

      <Col>
        <VictoryChart height={200} width={300}>
              <VictoryLine
              groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
              style={{ data: { stroke: "#c43a31", strokeWidth: 15, strokeLinecap: "round" } }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 6 }
              ]}
              />
        </VictoryChart>
      </Col>
    </Row>
    </Container>	
    );
  }
}