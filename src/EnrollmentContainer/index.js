import React from 'react'
import EnrollmentList from '../EnrollmentList'




export default function EnrollmentContainer(props) {

	
				
		
	
	

	

	
	

		return (
			<React.Fragment>
				<h1>User Enrollments</h1>
				<EnrollmentList 
					deleteEnrollment={props.deleteEnrollment}
					enrollments={props.enrollments} 
				/>
				

			</React.Fragment>

		)
	}


