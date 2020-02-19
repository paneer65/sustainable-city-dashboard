import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/auth";

import "./style.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { history } = props;
  const { setIsAuthenticated, setJWTToken } = useAuth();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let data = {
      'username': username,
      'password': password
    }

    fetch('http://localhost:8000/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        setErrorMessage('Username or password is invalid');
        return false;
      } else {
        setErrorMessage('Unknown error')
        return false;
      }
    })
    .then(response => {
      if (response) {
        setIsAuthenticated(true)
        setJWTToken(response['Token'])
        history.push('/dashboard');
      }
    });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        {errorMessage}
        <Button block size="lg" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );

}
