import React, {Component} from 'react'
import {Form, Button, Label } from 'semantic-ui-react'

export default class LogInRegisterForm extends Component {
	constructor() {
		super()
		this.state ={
			email: '',
			password: '',
			username:'',
			action: 'Login'
		}
	}

	switchForm = () => {
		if(this.state.action === 'Login') {
			this.setState({ action : 'Register'})
		} else {
			this.setState({ action: 'Login'})
		}
	}
	render () {
		return (
			<React.Fragment>
				<h2> User {this.state.action}</h2>
				<Form>
				{ 
					this.state.action === "Register"
					&&
					<React.Fragment>
						<Label> Last Name:</Label>
						<Form.Input
							type='text'
							name='lastname'
							placeholder='Enter Last Name'
							value={this.state.username}
						/>
						<Label> First Name:</Label>
						<Form.Input
							type='text'
							name='firstname'
							placeholder='Enter first name'
							value={this.state.firstname}
						/>
					</React.Fragment>
				} 

					<Label> Username:</Label>
					<Form.Input
						type='text'
						name='username'
						placeholder='Enter your Username'
						value={this.state.username}
					/>
					<Label> Email:</Label>
					<Form.Input
						type='text'
						name='email'
						placeholder='Enter your email'
						value={this.state.email}
					/>
					<Label>Password:</Label>
					<Form.Input
						type='text'
						name='password'
						placeholder='Enter your Password'
						value={this.state.password}
					/>
				{
					this.state.action === 'Register'
					&&
					<React.Fragment>
						<Label className='ui checkbox'>Admin Account</Label>
						<Form.Input
							type='checkbox'
							name='is_admin'
							value={this.state.is_admin}
						/>
					</React.Fragment>
				}
					<Button type='Submit'>
						{this.state.action === 'Login' ? "Log In": "Register"}
					</Button>
				</Form>
				{
					this.state.action === 'Login'
					?
					<p>
						Need to <span className="fake-link" onClick={this.switchForm}>register</span>
					</p>
					:
					<p>
						<span className="fake-link" onClick={this.switchForm}>Log in</span> with an existing account.
					</p>
				}
			</React.Fragment>
		)
	}
}