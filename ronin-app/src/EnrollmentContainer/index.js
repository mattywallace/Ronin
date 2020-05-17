import React, { Component } from 'react'
import CourseContainer from '../CourseContainer'
import EnrollmentList from '../EnrollmentList'


export default class EnrollmentContainer extends Component {
	constructor(props) {
		super(props)
		console.log(props, 'being passed in the enrollmentContainer');
		
	}

	
			
	render() {
		return (
			<React.Fragment>
				<EnrollmentList enrollments={this.props.enrollments}/>
			
			</React.Fragment>

		)
	}
}

