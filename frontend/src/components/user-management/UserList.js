import React from "react"
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

class UserList extends React.Component {

  buildUsersList() {
    let users = this.props.users;
    let userListHTML = users.map(user => {
      return(
        <tr>
          <td>{ user.id }</td>
          <td>{ user.username }</td>
          <td>{ user.email }</td>
          <td>Actions</td>
        </tr>
      )
    });
    return userListHTML;
  }

  render() {
    const userRows = this.buildUsersList()

    return (
      <div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { userRows }
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default UserList;
