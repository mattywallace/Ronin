import React, { Component } from 'react'
import CourseList from '../CourseList'
import CreateCourseForm from '../CreateCourseForm'

export default class courseContainer extends Component {
	constructor() {
		super()
		this.state = {
			courses: []
		}
	}

	componentDidMount() {
		this.getCourses()
	}

	getCourses = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/courses/"
			const coursesResponse = await fetch(url, {
				   	credentials: 'include',
				   	headers: { 
				   		'Content-Type': 'application/json' 
				   	}
				})	   
			const coursesJson = await coursesResponse.json()
			console.log('this is courses json' ,coursesJson);
			console.log(coursesResponse);
			this.setState({
				courses: coursesJson.data
			})
		} catch (error) {
			console.log('Error getting courses data');
		}
	}
	render() {
		console.log("here is the this.state in render() in user container");
		console.log(this.state);
		return(
			<React.Fragment>
				<h2>Courses Contianer</h2>
				<CreateCourseForm />
				<CourseList courses={this.state.courses} />
			</React.Fragment>
		)
	}
}