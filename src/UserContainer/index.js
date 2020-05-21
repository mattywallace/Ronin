import React, { Component } from 'react'
import EnrollmentContainer from '../EnrollmentContainer'
import CourseContainer from '../CourseContainer'




export default class UserContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			enrollments: [],	

		}
	}

	componentDidMount() {
		this.getUsers()
		this.getEnrollments()
	}

	getEnrollments = async () => {
   		try {
	      const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + this.props.state.loggedInUserId
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
	      console.log('Error getting enrollments data');
	      console.error(error)
	    }
	}

	createEnrollment = async (enrollmentToAdd) => {
	    console.log('Props from APP');
	    console.log('HERE IS THE COURSE ID IN ENROLLMENTS');
	    console.log(enrollmentToAdd);
	    try {
	      const url = process.env.REACT_APP_API_URL  + "/api/v1/enrollments/" + enrollmentToAdd + '/' + this.props.state.loggedInUserId
	      const createdEnrollmentResponse = await fetch(url, {
	        method: 'POST',
	        credentials:'include',
	        body: JSON.stringify(enrollmentToAdd),
	        headers: {
	          'Content-Type':'application/json'
	        }
	      })
	      console.log('createdEnrollmentResponse', createdEnrollmentResponse);
	      const createdEnrollmentJson = await createdEnrollmentResponse.json()
	      console.log("here is what we get when we try to enroll in a course");
	      console.log(createdEnrollmentJson);
	      if (createdEnrollmentResponse.status === 201 ) {
	        this.setState({
	          enrollments:[...this.state.enrollments, createdEnrollmentJson.data]
	        })
	      }
	      console.log('HERE IS THE STATE OF ENROLLMENTS IN APP.JS');
	      console.log(this.state.enrollments)
	    } catch (error) {
	      console.error('error enrolling in course');
	      console.error(error)
	   }

	}

	deleteEnrollment = async (idOfEnrollmentToDelete) => {
		console.log('delete enrollment');
		const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + idOfEnrollmentToDelete
		try {
			const deleteEnrollmentResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			})
			console.log("deleteEnrollmentResponse", deleteEnrollmentResponse);
			const deleteEnrollmentJson = await deleteEnrollmentResponse.json()
			console.log("deleteEnrollmentJson", deleteEnrollmentJson);
			if (deleteEnrollmentResponse.status === 200) {
				this.setState({
				courses: this.state.enrollments.filter(enrollment => enrollment.id !== idOfEnrollmentToDelete)
				})
			}	
		} catch (error) {
			console.error('Error deleting enrollment');
			console.error(error)
		}
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
				<EnrollmentContainer 
					enrollments={this.state.enrollments}
					deleteEnrollment={this.deleteEnrollment} 
					/>
				<CourseContainer 
					createEnrollment={this.createEnrollment}
					userInfo={this.props} />
				

			</React.Fragment>
		)
	}
}