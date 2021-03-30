import React from 'react'

const FillButton = (props) => {
	const getClasses = () => {
		let classes = ['button button--fill a a--1 u-c-pointer']

		if (props.extraStyle) classes.push(props.extraStyle)

		switch (props.type) {
			case 2:
				classes.push('button--fill--error')
				break
			case 3:
				classes.push('button--fill--warning')
				break
			case 4:
				classes.push('button--fill--info')
				break
			case 5:
				classes.push('button--fill--success')
				break
			default:
				classes.push('button--fill--primary')
		}

		return classes.join(' ', ', ')
	}

	return (
		<div
			className={ getClasses() }
			onClick={ props.onClickHandler }
			style={ { opacity: props.disabled ? 0.4 : 1 } }
		>
			{props.text }
		</div>
	)
}

export default FillButton
