import React, { Component } from 'react'
import MilsetoneList from '../MilestoneList'
import CreateMilestoneForm from '../CreateMilestoneForm'

export default class milstoneContainer extends Component {
	constructor() {
	super()
	this.state ={
		milestones: [],
	}
}

componentDidMount() {
	this.getMilestones()
}

getMilestones = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/milestones/" 
			const milestonesResponse = await fetch(url, {
				   	credentials: 'include',
				   	headers: { 
				   		'Content-Type': 'application/json' 
				   	}
				})	   
			const milestonesJson = await milestonesResponse.json()
			console.log('this is milestones json' ,milestonesJson);
			console.log(milestonesResponse);
			this.setState({
				milestones: milestonesJson.data
			})
		} catch (error) {
			console.log('Error getting Milestones data');
		}
	}
}

createMilestone = async (milestoneToAdd) => {
		console.log('THIS SHOULD BE PROPS FROM APP');
 		console.log(this.props.userInfo)
 		console.log(this.props.userInfo.loggedInUserId);
 		console.log('HERE IS THE milestone BEING ADDED');
 		console.log(milestoneToAdd);
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/milestones/" + courseId 
			const createdMilestoneResponse = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(courseToAdd),
				headers: {
					'Content-Type':'application/json'
				milestones
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

