import React from "react";
import NavigationBar from '../navigationbar/NavigationBar';
import UserActions from './UserActions';
import UserList from './UserList';

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
    fetch('http://localhost:8000/user/view_users')
			.then(r => r.json())
			.then(data => {
				this.setState({ users: data.users, usersLoaded: true })
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
