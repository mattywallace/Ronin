import React, {Component} from 'react'
import {List, Modal, Button } from 'semantic-ui-react'



const ViewCourseModal = (props) => {
	console.log('PROPS IN VIEW MODAL');
	console.log(props)
	const theCorrectCourse = props.courses.filter(course => course.id === props.idOfCourseToView)
	console.log('THIS IS THE CORRECT COURSE')
	console.log(theCorrectCourse);

	const milestones = theCorrectCourse[0].milestones.map(milestone => {
		return(
			<List.Item key={milestone.id} >
				{milestone.prompt}-{milestone.resources}
			</List.Item>
		)
	})
	return (
		<Modal open={true}>
			<List>
				{milestones}
			</List>
			<Button className='negative mini ui button' onClick={ () => props.closeModal() }>
				Close Modal
			</Button>
		</Modal>


	)
	
}

export default ViewCourseModal 
