import React, { Component } from 'react'
import EnrollmentList from '../EnrollmentList'


export default class EnrollmentContainer extends Component {
	constructor(props) {
		super(props)
		console.log(props, 'being passed in the enrollmentContainer');
		
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
					courses: this.props.enrollments.filter(enrollment => enrollment.id !== idOfEnrollmentToDelete)
					})
				}	
			} catch (error) {
				console.error('Error deleting enrollment');
				console.error(error)
			}
		}
	
	render() {
		return (
			<React.Fragment>
				<EnrollmentList 
					deleteEnrollment={this.deleteEnrollment}
					enrollments={this.props.enrollments} />
			
			</React.Fragment>

		)
	}
}

