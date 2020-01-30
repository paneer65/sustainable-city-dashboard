import React from 'react';
import ReactDOM from 'react-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import {VictoryBar, VictoryChart, VictoryLine, VictoryClipContainer} from 'victory';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const time_periods = ['Today','3 Months', '6 Months', '1 Year']

  export default class BusinessData extends React.Component
  {
    constructor(props) {
      super(props)
      this.state = {
        title : '',
        inputdata :{type:"Fiat", model:[
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 5 },
          { x: 4, y: 4 },
          { x: 5, y: 6 }
        ], color:"white"},
        period:''
      }
    }

  makeLines = () =>{
    let lines = []
    Object.entries(this.state.inputdata).map(([key, value]) => {
      lines.push(<h1>{key}{value}</h1>)
    // Pretty straightforward - use key for the key and value for the value.
    // Just to clarify: unlike object destructuring, the parameter names don't matter here.
    })
    return lines;
  }

  updateData(){
    //alert(Object.keys(this.state.inputdata))
    //this.updateChart()
    //api call to get data using title(traffic/pollution) and time period
    }

  changePeriod(period){
    this.state.period = period;
    this.updateData();
  }
    render(){
      let time_list = time_periods.map((element) =>
      {
        if (this.props.selectedFilter === element) {
          return (
            <ListGroup.Item as="li" active>
              <Button variant="info" onClick={ () => this.changePeriod(element) }>{ element }</Button>
            </ListGroup.Item>
          )
        } else {
          return (
            <ListGroup.Item as="li">
              <Button variant="info" onClick={ () => this.changePeriod(element)}>{ element }</Button>
            </ListGroup.Item>
          )
        }
      }
    )


      return (
      <Container>
      <Row className="justify-content-md-center">
        <ListGroup horizontal as="ul" className="center">
          { time_list }
        </ListGroup>

        </Row>
      <Row>
      <Row>{this.makeLines()}</Row>
      <Col>
        <VictoryChart height={200} width={300}>
              <VictoryLine
              groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }}/>}
              style={{ data: { stroke: "#c43a31", strokeWidth: 5, strokeLinecap: "round" } }}
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
