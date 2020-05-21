import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'




export default class EnrollmentList extends Component {
	constructor(props) {
		super(props)
		this.state ={
			courses: this.props.courses,
			enrollments: this.props.enrollments
		}
	}

	render(){
		console.log('THIS IS COURSES IN THE ENROLLMENT CONTAINER');
		console.log(this.state.courses);
		const enrollment = this.state.enrollments.map(enrollment => {
			return (
				<Card key={enrollment.id} color={'purple'}>
					<Card.Content textAlign={'center'}>
						<Card.Header>
							{enrollment.enrolled_course.course_name}
						</Card.Header>
						<Card.Description>

						</Card.Description>
						<Button className='negative mini ui button' onClick={() => this.props.deleteEnrollment(enrollment.id) }>
							Cancel Enrollment
						</Button>
						<Button>
							view
						</Button>
					</Card.Content>
				</Card>
			)
		})
		return (
			<Card.Group centered={true}>
			{enrollment}
			</Card.Group>
		)
	}
}


	