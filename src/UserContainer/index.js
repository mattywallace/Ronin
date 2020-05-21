import React, { Component } from 'react'
import CourseContainer from '../CourseContainer'





export default class UserContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
				

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
		console.log("here is the this.state.enrollments looking for milestones in USER CONTAINER");
		console.log(this.state);
		console.log(this.props.userAdmin);
		return(
			<React.Fragment>
				
				<CourseContainer 
					createEnrollment={this.createEnrollment}
					userAdmin={this.props.userAdmin}
					userInfo={this.props.userId} 
				/>
			</React.Fragment>
		)
	}
}