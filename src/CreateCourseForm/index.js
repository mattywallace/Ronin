import React, {Component} from 'react'
import {Form, Button, Label} from 'semantic-ui-react'

export default class CreateCourseForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			adminstrator: this.props.userInfo.loggedInUserId,
			course_name:'',
			description:'',
			certification: false,
		}
	}

	checkBoxChange = (event, data) => {
		console.log(event.target.name);
		console.log(event.target.value);
		console.log(data);
		this.setState({
			certification: !this.state.certification
		})
	}

 
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createCourse(this.state)
		this.setState({
			course_name:'',
			description:'',
			certification: false,
		})
}

	render() {
		console.log(this.state);
		console.log('THIS IS THE STATE IN CREATE COURSE FORM');
		return (
			<React.Fragment>
				<h2>Course Creator</h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> Course Name </Label>
						<Form.Input
							type='text'
							name='course_name'
							placeholder='Enter Course Name'
							value={this.state.course_name}
							onChange={this.handleChange}
						/>
						<Label> About the Course </Label>
						<Form.Input
							type='text'
							name='description'
							placeholder='Describe Course'
							value={this.state.description}
							onChange={this.handleChange}
						/>
						<Label className='ui checkbox'> Certification </Label>
						<Form.Input
							type='checkbox'
							name='certification'
							checked={this.state.certification}
							value={this.state.certification}
							onChange={this.checkBoxChange}
						/>
						<Button className='positive ui button' type='Submit'>
							Create Course
						</Button>
					</Form>
				</React.Fragment>

			)
	}
}
