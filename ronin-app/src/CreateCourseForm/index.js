import React, {Component} from 'react'
import {Form, Button, Label} from 'semantic-ui-react'

export default class CreateCourseForm extends Component {
	constructor() {
		super()
		this.state ={
			course_name:'',
			administrator:'',
			description:'',
			certification: false
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log(` here is the data in ${this.state.action.toLowerCase()} with the following conditions `)
		console.log(this.state);
}

	render() {
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
							value={this.state.descrption}
							onChange={this.handleChange}
						/>
						<Label> Certification </Label>
						<Form.Input
							type='checkbox'
							name='certification'
							placeholder='Enter Course Name'
							value={this.state.certification}
							onChange={this.handleChange}
						/>
						<Button type='Submit'>
							Create Course
						</Button>
					</Form>
				</React.Fragment>

			)
	}
}
