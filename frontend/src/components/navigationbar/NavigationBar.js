import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'

function handleLogoutClick(){
  localStorage.clear("token");
  window.location.href="/";
}

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Sustainable City Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/user-management">
            <Nav.Link>User Management</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/logout">
            <Nav.Link onClick={()=>{handleLogoutClick()}}>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
