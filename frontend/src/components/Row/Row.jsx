import React from 'react'

const Row = props => {

	const getClasses = () => {
		let classes = ["row"]

		if(props.jc)
			classes.push("jc--"+props.jc)
		
		if(props.ai)
			classes.push("ai--"+props.ai)

		if(props.fd)
			classes.push("fd--"+props.fd)

		if(props.extraStyle)classes.push(props.extraStyle)

		return classes.join(' ', ", ")
	}

	return (
		<div className={getClasses()}>{props.children}</div>
	)
}

export default Row