import React from "react"
import Button from 'react-bootstrap/Button'
import UserCreationModal from './UserCreationModal'

class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserCreationModal: false
    };

    this.toggleUserCreationModal = this.toggleUserCreationModal.bind(this);

  }

  toggleUserCreationModal() {
    this.setState({showUserCreationModal: !this.state.showUserCreationModal});
  }

  render() {
    return (
      <div>
        <Button onClick={ () => this.toggleUserCreationModal() }>Create User</Button>
        <UserCreationModal showModal={this.state.showUserCreationModal} toggleUserCreationModal={this.toggleUserCreationModal}/>
      </div>
    )
  }
}

export default UserActions;
