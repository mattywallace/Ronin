import React, { Component } from 'react'
import CourseList from '../CourseList'
import CreateCourseForm from '../CreateCourseForm'

export default class courseContainer extends Component {
	constructor() {
		super()
		this.state = {
			courses: [],
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

	deleteCourse = async (idOfCourseToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/v1/courses/" + idOfCourseToDelete
		try {
			const deleteCourseResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			})
			console.log("deleteCoruseResponse", deleteCourseResponse);
			const deleteCourseJson = await deleteCourseResponse.json()
			console.log("deleteCourseJson", deleteCourseJson);
			if (deleteCourseResponse.status == 200) {
				this.setState({
				courses: this.state.courses.filter(course => course.id != idOfCourseToDelete)
				})
			}	
		} catch (error) {
			console.error('Error deleting course');
			console.error(error)
		}
	}

	createCourse = async (courseToAdd) => {
		console.log('THIS SHOULD BE PROPS FROM APP');
 		console.log(this.props.userInfo)
 		console.log(this.props.userInfo.loggedInUserId);
 		console.log('HERE IS THE COURSE BEING ADDED');
 		console.log(courseToAdd);
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/courses/create" 
			const createdCourseResponse = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(courseToAdd),
				headers: {
					'Content-Type':'application/json'
				}
			})
			console.log("createdCourseResponse", createdCourseResponse);

			const createCourseJson = await createdCourseResponse.json()
			console.log('here is what we got back after trying to add a course');
			console.log(createCourseJson);
			if (createdCourseResponse.status === 201 ){
				this.setState({
					courses:[...this.state.courses, createCourseJson.data]
				})
			}
		} catch (error) {
			console.error("Error adding course");
			console.error(error)
		}

	}
	
	render() {
		console.log("here is the this.state in render() in user container");
		console.log(this.state);
		return(
			<React.Fragment>
				<h2>Courses Contianer</h2>
				<CreateCourseForm 
					userInfo={this.props.userInfo}
					createCourse={this.createCourse}/>
				<CourseList 
					courses={this.state.courses} 
					deleteCourse={this.deleteCourse}
				/>
			</React.Fragment>
		)
	}
}