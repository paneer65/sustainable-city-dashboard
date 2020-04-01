import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const modules_list = ['Traffic', 'Pollution', 'Bikes']

class Filters extends React.Component {
  render() {
    let modules_list_html = modules_list.map((element) =>
      {
        if (this.props.selectedFilter === element) {
          return (
            <ListGroup.Item as="li" key={ element } active >
              <Button variant="dark" onClick={ () => this.props.updateSelectedFilter(element) }>{ element }</Button>
            </ListGroup.Item>
          )
        } else {
          return (
            <ListGroup.Item as="li" key={ element }>
              <Button variant="dark" onClick={ () => this.props.updateSelectedFilter(element) }>{ element }</Button>
            </ListGroup.Item>
          )
        }
      }
    )

    return (
      <div className="Filters">
        <ListGroup as="ul">
          { modules_list_html }
        </ListGroup>
      </div>
    )
  }
}

export default Filters;
