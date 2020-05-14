import React, { Component } from 'react'
import UserList from '../UserList'

export default class UserContainer extends Component {
	constructor() {
		super()
		this.state = {
			users: []
		}
	}

	componentDidMount() {
		this.getUsers()
	}

	getUsers = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/users/"
			const usersResponse = await fetch(url)
			const usersJson = await usersResponse.json()
			console.log(usersJson);
			console.log(usersResponse);
			this.setState({
				users: usersJson.data
			})
		} catch (error) {
			console.log('Error getting users data');
		}
	}
	render() {
		console.log("here is the this.state in render() in user container");
		console.log(this.state);
		return(
			<React.Fragment>
				<h2>User Contianer</h2>
				<UserList />
				
			</React.Fragment>
		)
	}
}