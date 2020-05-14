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
			const usersResponse = await fetch(url)
			const usersJson = await usersResponse.json()
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
			<h2>User Contianer</h2>
		)
	}
}