import React from 'react'
import '../index.css'

export default function Header(props) {
	return(
		<nav>
			<div>
				<p className='fake-link' onClick={props.logout}>Log Out </p>
				<p>{props.email}</p>
			</div>
		</nav>
	)
}
