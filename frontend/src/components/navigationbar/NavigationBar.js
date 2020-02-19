import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import  { Redirect } from 'react-router-dom'
import { useAuth } from "../../context/auth";


async function handleLogoutClick(getJWTToken, deleteJWTToken) {
  fetch('http://localhost:8000/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Auth-Token': getJWTToken(),
    }
  })
  .then((response) => {
    deleteJWTToken();
    if(response.status == 200) {
     window.location.href = '/';
    }
  });
}

function NavigationBar() {
  const { getJWTToken, deleteJWTToken } = useAuth();
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
            <Nav.Link onClick={()=>{ handleLogoutClick(getJWTToken, deleteJWTToken)} }>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
