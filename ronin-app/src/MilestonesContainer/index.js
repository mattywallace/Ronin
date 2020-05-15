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

// getMilestones()