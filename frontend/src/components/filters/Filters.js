import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const modules_list = ['Traffic', 'Pollution']

function Filters() {

  let modules_list_html = modules_list.map((element) =>
    <ListGroup.Item as="li">
      <Button variant="dark"> { element }</Button>
    </ListGroup.Item>
  )

  return (
    <div className="Filters">
      <ListGroup as="ul">
        { modules_list_html }
      </ListGroup>
    </div>
  )
}

export default Filters
