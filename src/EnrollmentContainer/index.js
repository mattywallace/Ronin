import React from 'react'
import EnrollmentList from '../EnrollmentList'




export default function EnrollmentContainer(props) {


		return (
			<React.Fragment>
				
				<EnrollmentList 
					deleteEnrollment={props.deleteEnrollment}
					enrollments={props.enrollments} 
					courses={props.courses}
				/>
			</React.Fragment>
		)
	}


