import React, { Component } from 'react'
import MilestoneList from '../MilestoneList'
import CreateMilestoneForm from '../CreateMilestoneForm'

export default class MilestoneContainer extends Component {
	constructor(props) {
		super(props)
		console.log('PROPS IN MILESTONE CONTAINER');
		console.log(this.props);
		this.state ={
			milestones:[],
			idOfMilestoneToEdit: -1
			
		}
	}

	componentDidMount () {
		this.getMilestones()
	}

	getMilestones = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/milestones/" + this.props.state.idOfCourseToEdit
			const milestonesResponse = await fetch(url, {
				credentials: 'include'
			})
			console.log('this is  MILESTONESresponse', milestonesResponse);
			const milestonesJson = await milestonesResponse.json()
			console.log('this is MILESTONES json' , milestonesJson);
			this.setState({
				milestones: milestonesJson.data
			})
		} catch (error) {
			console.log('Error getting Milestones data');
		}
	}

	createMilestone = async (milestoneToCreate) => {
		console.log('HERE IS THE COURSE ID BEING PASSED INTO CREATE MILESTONE');
		console.log(milestoneToCreate);
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/milestones/" + this.props.state.idOfCourseToEdit
			const createdMilestoneResponse = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(milestoneToCreate),
				headers: {
					'Content-Type':'application/json'
				}
			})
			console.log("createdMilsetoneResponse", createdMilestoneResponse);
			const createMilestoneJson = await createdMilestoneResponse.json()
			console.log('here is what we got back after trying to add a MILESTONE');
			console.log(createMilestoneJson);
			if (createdMilestoneResponse.status === 200 ){
				this.setState({
					milestones:[...this.state.milestones, createMilestoneJson.data]
				})
			}
			console.log('THIS IS A STATE CHECK AFTER ADDING MILESTONES');
			console.log(this.state.milestones);
		} catch (error) {
			console.error("Error adding milestone");
			console.error(error)
		}
		
	}

	render() {
		console.log(' here is the state in render in Milestone Container');
		console.log(this.state);
		return (

			<React.Fragment>
				<CreateMilestoneForm 
					createMilestone={this.createMilestone} />
				<MilestoneList 
					milestones={this.state.milestones} />
			</React.Fragment>
		)
	}
}
	



