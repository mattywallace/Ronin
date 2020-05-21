import React, { Component } from 'react'
import CourseList from '../CourseList'
import CreateCourseForm from '../CreateCourseForm'
import EditCourseModal from '../EditCourseModal'
import MilestoneContainer from '../MilestoneContainer'
import EnrollmentContainer from'../EnrollmentContainer'


export default class courseContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			courses: [],
			enrollments: [],
			idOfCourseToEdit: -1,					
		}
	}

	componentDidMount() {
		this.getCourses()
		this.getEnrollments()
		
	}

	getEnrollments = async () => {
   		try {
	      const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + this.props.userInfo
	      const enrollmentsResponse = await fetch(url, {
	        credentials:'include',
	        headers: {
	          'Content-Type': 'application/json'
	        }
	      })
	      const enrollmentsJson = await enrollmentsResponse.json()
	      console.log('this is enrollmentsJson', enrollmentsJson);
	      console.log('this is enrollmentsResponse', enrollmentsResponse);
	      this.setState({
	        enrollments: enrollmentsJson.data
	      })
	    } catch (error) {
	      console.log('Error getting enrollments data');
	      console.error(error)
	    }
	}

	createEnrollment = async (enrollmentToAdd) => {
	    console.log('Props from APP');
	    console.log('HERE IS THE COURSE ID IN ENROLLMENTS');
	    console.log(enrollmentToAdd);
	    try {
	      const url = process.env.REACT_APP_API_URL  + "/api/v1/enrollments/" + enrollmentToAdd + '/' + this.props.userInfo
	      const createdEnrollmentResponse = await fetch(url, {
	        method: 'POST',
	        credentials:'include',
	        body: JSON.stringify(enrollmentToAdd),
	        headers: {
	          'Content-Type':'application/json'
	        }
	      })
	      console.log('createdEnrollmentResponse', createdEnrollmentResponse);
	      const createdEnrollmentJson = await createdEnrollmentResponse.json()
	      console.log("here is what we get when we try to enroll in a course");
	      console.log(createdEnrollmentJson);
	      if (createdEnrollmentResponse.status === 201 ) {
	        this.setState({
	          enrollments:[...this.state.enrollments, createdEnrollmentJson.data]
	        })
	      }
	      console.log('HERE IS THE STATE OF ENROLLMENTS IN APP.JS');
	      console.log(this.state.enrollments)
	    } catch (error) {
	      console.error('error enrolling in course');
	      console.error(error)
	   }

	}

	deleteEnrollment = async (idOfEnrollmentToDelete) => {
		console.log('delete enrollment');
		const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + idOfEnrollmentToDelete
		try {
			const deleteEnrollmentResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			})
			console.log("deleteEnrollmentResponse", deleteEnrollmentResponse);
			const deleteEnrollmentJson = await deleteEnrollmentResponse.json()
			console.log("deleteEnrollmentJson", deleteEnrollmentJson);
			if (deleteEnrollmentResponse.status === 200) {
				this.setState({
					enrollments: this.state.enrollments.filter(enrollment => enrollment.id !== idOfEnrollmentToDelete)
				})
			}	
		} catch (error) {
			console.error('Error deleting enrollment');
			console.error(error)
		}
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
			if (deleteCourseResponse.status === 200) {
				this.setState({
				courses: this.state.courses.filter(course => course.id !== idOfCourseToDelete)
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


		closeModal = () => {
			this.setState({
				idOfCourseToEdit: -1
		})
	}
	
	render() {
		console.log("here is the this.state in render() in course container");
		console.log(this.state);
		console.log(this.props.userAdmin);
		return(
			<React.Fragment>
				
				{ this.props.userAdmin === true
					&&
					<CreateCourseForm 
						userInfo={this.props.userInfo}
						createCourse={this.createCourse}/>
				}
					<h2>Current Enrollments</h2>
					
					<EnrollmentContainer 
						enrollments={this.state.enrollments}
						deleteEnrollment={this.deleteEnrollment}
						courses={this.state.courses}
					/>
					
					<h2>Course Catalougue</h2>
					<CourseList 
						courses={this.state.courses} 
						userInfo={this.props.userInfo}
						deleteCourse={this.deleteCourse}
						editCourse={this.editCourse}
						enrollments={this.state.enrollments}
						createEnrollment={this.createEnrollment}	
					/>


				{ this.state.idOfCourseToEdit !== -1 
					&& 
				<React.Fragment>
					<EditCourseModal 
						key={this.state.idOfCourseToEdit}
						courseToEdit={this.state.courses.find((course) => course.id === this.state.idOfCourseToEdit)}
						updateCourse={this.updateCourse}
						closeModal={this.closeModal}
						/>
					<MilestoneContainer state={this.state}/>
				</React.Fragment>
				}

			</React.Fragment>
		)
	}
}