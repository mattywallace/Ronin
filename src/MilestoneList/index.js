import React from 'react'
import { Card, Button } from 'semantic-ui-react'


export default function MilestoneList(props) {
	console.log('PROPS In Milestone LIST');
	console.log(props);
	const milestone = props.milestones.map(milestone => {
		return (
			<Card key={milestone.id} color={'purple'}>
				<Card.Content textAlign={'center'}>
					<Card.Header>
						{milestone.prompt}
					</Card.Header>
					<Card.Description>
						{milestone.resources}
					</Card.Description>
					<Button onClick={ () => props.editMilestone(milestone.id)} >
						Edit Milestone
					</Button>
					<Button className='negative ui button' onClick={ () => props.deleteMilestone(milestone.id)}> 
						Delete Milestone
					</Button>
				</Card.Content>
			</Card>
		)
	})

	return (
		<Card.Group centered={true}>
		{milestone}
		</Card.Group>
	)
}
