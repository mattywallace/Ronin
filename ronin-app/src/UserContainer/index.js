import React, { Component } from 'react'

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
			console.log('tyring to fetch data from ');
			console.log(url);
			const usersResponse = await fetch(url)
			const usersJson = await usersResponse.json()
			console.log(" here is the data in users container");
			console.log(usersJson);
		} catch (error) {
			console.log('Error getting users data');

		}
	}
	render() {
		return(
			<h2>User Contianer</h2>
		)
	}
}