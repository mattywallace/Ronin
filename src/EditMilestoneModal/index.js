import React, {Component} from 'react'
import {Form, Button, Label} from 'semantic-ui-react'

export default class CreateMilestoneForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			prompt: props.milestoneToEdit.prompt,
			resources: props.milestoneToEdit.resources	
		}
	}
 
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.updateMilestone(this.state)

	}

	render() {
		console.log(this.state);
		console.log('THIS IS THE STATE IN CREATE MILESTONE UPDATE');
		return (
			<React.Fragment>
				<h2>Milestone Editor</h2>
				<Form onSubmit={this.handleSubmit}>
					<Label> Prompt </Label>
						<Form.Input
							type='text'
							name='prompt'
							placeholder='Enter Prompt'
							value={this.state.prompt}
							onChange={this.handleChange}
						/>
						<Label> Student Resources </Label>
						<Form.Input
							type='text'
							name='resources'
							placeholder='resources'
							value={this.state.resources}
							onChange={this.handleChange}
						/>
						<Button className='positive ui button' type='Submit'>
							Create Milestone
						</Button>
					</Form>
				</React.Fragment>
		)
	}
}
