import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import ViewCourseModal from '../ViewCourseModal'




export default class EnrollmentList extends Component {
	constructor(props) {
		super(props)
		this.state ={
			courses: this.props.courses,
			enrollments: this.props.enrollments,
			idOfCourseToView: -1
		}
	}

	viewModal = (idOfCourseToView) => {
		this.setState({
			idOfCourseToView: idOfCourseToView
		})	

	}

	closeModal = () => {
		this.setState({
			idOfCourseToView: -1
		})	
	}


	render(){
		// console.log('THIS IS COURSES IN THE ENROLLMENT CONTAINER');
		// console.log(this.state.courses);
		console.log('THIS IS PROPS IN ENROLLMENT LIST');
		console.log(this.props);
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
						<Button className='positive mini ui button' onClick={ () => this.viewModal(enrollment.id) }>
							view
						</Button>
					</Card.Content>
				</Card>
			)
		})
		return (
			<React.Fragment>
				<Card.Group centered={true}>
				{enrollment}
				</Card.Group>
			{
				this.state.idOfCourseToView !== -1
				&&
				<ViewCourseModal 
					courses={this.props.courses} 
					enrollments={this.props.enrollments}
					idOfCourseToView={this.state.idOfCourseToView}
					closeModal={this.closeModal}
				/>

			}
			</React.Fragment>
		)
	}
}


	