import React from "react";
import NavigationBar from '../navigationbar/NavigationBar';
import UserActions from './UserActions';
import UserList from './UserList';
import axios from 'axios';

class UserManagementIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLoaded: false
    };
  }

  componentDidMount() {
  	this.fetchUsersList();
  }

  fetchUsersList() {
    axios({
      url: '/user/view_users',
      method: 'GET'
    }).then(response => {
			this.setState({ users: response.data.users, usersLoaded: true })
		})
  }

	render() {
    return (
      <div>
        <NavigationBar/>
        <h1>User Management Dashboard</h1>
        <UserActions/>
        {
          this.state.usersLoaded ? <UserList users={ this.state.users }/> : <p>Loading</p>
        }
      </div>
    )
  }
}

export default UserManagementIndex
