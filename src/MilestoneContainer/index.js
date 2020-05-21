import React, { Component } from 'react'
import MilestoneList from '../MilestoneList'
import CreateMilestoneForm from '../CreateMilestoneForm'
import EditMilestoneModal from '../EditMilestoneModal'

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
			const milestonesJson = await milestonesResponse.json()
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
			const createMilestoneJson = await createdMilestoneResponse.json()
			if (createdMilestoneResponse.status === 200 ){
				this.setState({
					milestones:[...this.state.milestones, createMilestoneJson.data]
				})
			}
		} catch (error) {
			console.error("Error adding milestone");
			console.error(error)
		}
	}


	editMilestone = (idOfMilestoneToEdit) => {
		console.log('you are tyring to edit this milestone', idOfMilestoneToEdit);
			this.setState({
				idOfMilestoneToEdit: idOfMilestoneToEdit
			})
	}

	updateMilestone = async (updatedMilestoneInfo) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/milestones/' + this.props.state.idOfCourseToEdit + '/' + this.state.idOfMilestoneToEdit
		console.log('THIS IS THE UPDATED MILESTONE INFO', updatedMilestoneInfo);
		try {
			const updatedMilestoneResponse = await fetch(url, {
				credentials:'include',
				method: 'PUT',
				body:JSON.stringify(updatedMilestoneInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			const updatedMilestoneJson = await updatedMilestoneResponse.json()
			console.log(updatedMilestoneJson);
			this.setState({idOfMilestoneToEdit: - 1})
			this.getMilestones()
		} catch (error) {
			console.error("Error updating Milestone Info");
			console.error(error)
		}
	}

	deleteMilestone = async (idOfMilestoneToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/v1/milestones/" + this.props.state.idOfCourseToEdit + '/' + idOfMilestoneToDelete
		try {
			const deleteMilestoneResponse = await fetch(url, {
				credentials: "include",
				method: "DELETE"
			})
			console.log("deleteMilestoneResponse", deleteMilestoneResponse);
			const deleteMilestoneJson = await deleteMilestoneResponse.json()
			console.log("deleteMilestoneJson", deleteMilestoneJson);
			if (deleteMilestoneResponse.status === 200) {
				this.setState({
				milestones: this.state.milestones.filter(milestone => milestone.id !== idOfMilestoneToDelete)
				})
			}	
		} catch (error) {
			console.error('Error deleting milestone');
			console.error(error)
		}
	}

	closeModal =() => {
		this.setState({
			idOfMilestoneToEdit: -1
		})
	}
	
	render() {
		return (
			<React.Fragment>
				<CreateMilestoneForm 
					createMilestone={this.createMilestone} />
				<MilestoneList 
					milestones={this.state.milestones} 
					updateMilestone={this.updateMilestone}
					editMilestone={this.editMilestone}
					deleteMilestone={this.deleteMilestone} 
				/>
			{
				this.state.idOfMilestoneToEdit !== -1 
				&&
				<EditMilestoneModal 
					key={this.state.idOfMilestoneToEdit}
					milestoneToEdit={this.state.milestones.find((milestone) => milestone.id === this.state.idOfMilestoneToEdit)}
					updateMilestone={this.updateMilestone}
					closeModal={this.closeModal}
				/>

			}
			</React.Fragment>
		)
	}
}
	



