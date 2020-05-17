import React, { Component } from 'react'
import CourseList from '../CourseList'
import CreateCourseForm from '../CreateCourseForm'
import EditCourseModal from '../EditCourseModal'
import EnrollmentContainer from '../EnrollmentContainer'

export default class courseContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			courses: [],
			idOfCourseToEdit: -1
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

	editCourse = (idOfCourseToEdit) => {
		console.log('you are tyring to edit this course', idOfCourseToEdit);
		this.setState({
			idOfCourseToEdit: idOfCourseToEdit
		})
	}

	updateCourse = async (updatedCourseInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/courses/' + this.state.idOfCourseToEdit
		console.log('THIS IS THE UPDATED COURSE INFO', updatedCourseInfo);
		try {
			const updatedCourseResponse = await fetch(url, {
				credentials:'include',
				method: 'PUT',
				body:JSON.stringify(updatedCourseInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updatedCourseResponse", updatedCourseResponse);
			const updatedCourseJson = await updatedCourseResponse.json()
			console.log("updatedCourseJson", updatedCourseJson);
			this.setState({idOfCourseToEdit: - 1})
			this.getCourses()
		} catch (error) {
			console.error("Error updating course info");
			console.error(error)
		}
	}
	
	render() {
		console.log("here is the this.state in render() in user container");
		console.log(this.state);
		return(
			<React.Fragment>
				<h2>Courses Container</h2>
				<CreateCourseForm 
					userInfo={this.props.userInfo}
					createCourse={this.createCourse}/>
				<CourseList 
					courses={this.state.courses} 
					deleteCourse={this.deleteCourse}
					editCourse={this.editCourse}
					createEnrollment={this.props.createEnrollment}
				/>
			
				{ this.state.idOfCourseToEdit !== -1 
					&& 
					<EditCourseModal 
						courseToEdit={this.state.courses.find((course) => course.id === this.state.idOfCourseToEdit)}
						updateCourse={this.updateCourse}
						/>}
			</React.Fragment>
		)
	}
}