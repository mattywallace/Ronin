import React from 'react'
import { Card, Button } from 'semantic-ui-react'


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
						Instructor: {course.administrator.username}	
					</Card.Meta>
					
					{
						course.certification === true 
						&&
						<Card.Meta>
							Certification Upon Completion
						</Card.Meta>
					}

					<Card.Description>
						{course.description}
					</Card.Description>
					<Button>
						Enroll
					</Button> 
					<Button>
						View
					</Button>
					<Button 
						className='negative ui button'
						onClick={ () => props.deleteCourse(course.id)}
					>
						Delete
					</Button>
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