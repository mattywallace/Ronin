import React from 'react'
import { Card } from 'semantic-ui-react'


export default function CourseList(props) {
	console.log("props in courselidst");
	console.log(props);
	const course = props.courses.map(course => {
		return (
			<Card key={course.id} color={"purple"}>
				<Card.Content textAlign={'center'}>
					<Card.Header>
						{course.course_name}
					</Card.Header>
					<Card.Meta>
						{course.administrator.username}
					</Card.Meta>
					{
						course.certification === true 
						&&
						<Card.Meta>
							Certification upon Completion
						</Card.Meta>
					}

					<Card.Description>
						{course.description}
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})
	return (
		<Card.Group centered={true}>
			{course}
		</Card.Group>
	)
}