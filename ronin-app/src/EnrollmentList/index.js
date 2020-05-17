import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'


export default function EnrollmentList(props) {
	console.log('PROPS IN ENROLLMENT LIST');
	console.log(props);
	const enrollment = props.enrollments.map(enrollment => {
		return (
			<Card key={enrollment.id} color={'purple'}>
				<Card.Content textAlign={'center'}>
					<Card.Header>
						{enrollment.enrolled_course.course_name}
					</Card.Header>

					<Button className='negative mini ui button'>
						Cancell Enrollment
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