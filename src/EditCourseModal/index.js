import React, {Component} from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class EditCourseModal extends Component {
	constructor(props) {
		super (props)
		console.log('HERE ARE THE PROPS IN EDITCOURSEMODAL');
		console.log(this.props);
		this.state = {
			course_name: props.courseToEdit.course_name,
			description: props.courseToEdit.description,
			certification: props.courseToEdit.certification,
			milestones:[]
		}
	}
		
		handleChange = (event) => {
			this.setState({
				[event.target.name]: event.target.value
			})
		}	
		handleSubmit = (event) => {
			event.preventDefault()
			this.props.updateCourse(this.state)
		}

	
	render() {
		return(
			<Segment>
				<h3> Edit Course </h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
						type='text'
						name='course_name'
						value={this.state.course_name}
						placeholder='Edit Name'
						onChange={this.handleChange}
					/>
					<Label>Description:</Label>
					<Form.Input
						type='text'
						name='description'
						value={this.state.description}
						placeholder='Edit Description'
						onChange={this.handleChange}
					/>
					<Label>Certification</Label>
					<Form.Input
						type='checkbox'
						name='certification'
						value={this.state.certification}
						onChange={this.handleChange}
					/>
					<Button className='positive ui button' type='Submit'>
						Complete Edit
					</Button>
				</Form>
			</Segment>
		)
	}	
}