import React from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

class UserCreationModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = { username: '', email: '', password: '' }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  createNewUser() {
    let data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }

    fetch('http://localhost:8000/user/create_user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        this.closeModal();
      } else if (response.status === 404) {
        this.closeModal();
      }
    })
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  closeModal() {
    this.props.toggleUserCreationModal();
  }

  render(){
    return (
      <Modal show={ this.props.showModal }>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsernameChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={ this.state.email } onChange={this.handleEmailChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={ this.state.password } onChange={this.handlePasswordChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ () => this.closeModal() }>Close</Button>
          <Button variant="primary" onClick={ () => this.createNewUser() }>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default UserCreationModal
