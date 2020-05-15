import React, { Component } from 'react'
// import EnrollmentList from '../EnrollmentList'

export default class EnrollmentContainer extends Component {
	contructor() {
		super()
		this.state = {
			enrollments: []
		}
	}

	componentDidMount() {
		this.getEnrollments()
	}

	getEnrollments = async () => {
		try {
			const url = process.env.REACT_APP_API_URL +"api/v1/enrollments/"
			const enrollmentsResponse = await fetch(url, {
				credentials:'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const enrollmentsJson = await enrollmentsResponse.json()
			console.log('this is enrollmentsJson', enrollmentsJson);
			console.log('this is enrollmentsResponse', enrollmentsResponse);
			this.setState({
				enrollments: enrollmentsJson.data
			})
		} catch (error) {
			console.log('Error getting enorllments data');
		}
	}
	

	createEnrollemt = async (CourseId) => {
		console.log('Props from APP');
		console.log();(this.props.userInfo)
		const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + COURSEID + this.props.userInfo.loggedInUserId
	}
}
