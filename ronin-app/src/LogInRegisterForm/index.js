import React, {Component} from 'react'
import {Form, Button, Label } from 'semantic-ui-react'

export default class LogInRegisterForm extends Component {
	constructor() {
		super()
		this.state ={
			email: '',
			password: '',
			username:'',
			firstname:'',
			lastname:'',
			is_admin: false,
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

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log(` here is the data in ${this.state.action.toLowerCase()} with the following conditions `)
		console.log(this.state);

		if (this.state.action === "Register") {
			this.props.register(this.state)
		} else {
			this.props.login(this.state)
		}
	}


	render () {
		return (
			<React.Fragment>
				<h2> User {this.state.action}</h2>
				<Form onSubmit={this.handleSubmit}>
				{ 
					this.state.action === "Register"
					&&
					<React.Fragment>
						<Label> Last Name:</Label>
						<Form.Input
							type='text'
							name='lastname'
							placeholder='Enter Last Name'
							value={this.state.lastname}
							onChange={this.handleChange}
						/>
						<Label> First Name:</Label>
						<Form.Input
							type='text'
							name='firstname'
							placeholder='Enter first name'
							value={this.state.firstname}
							onChange={this.handleChange}
						/>
					</React.Fragment>
				} 

					<Label> Username:</Label>
					<Form.Input
						type='text'
						name='username'
						placeholder='Enter your Username'
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<Label> Email:</Label>
					<Form.Input
						type='email'
						name='email'
						placeholder='Enter your email'
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<Label>Password:</Label>
					<Form.Input
						type='password'
						name='password'
						placeholder='Enter your Password'
						value={this.state.password}
						onChange={this.handleChange}
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
							onChange={this.handleChange}
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