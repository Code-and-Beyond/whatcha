import React from 'react'

const HoverButton = props => {

	const getClasses = () => {
		let classes=["button button--hover a a--1 u-c-pointer"]

		switch(props.type){
			case 2: classes.push("button--hover--error"); break;
			case 3: classes.push("button--hover--warning"); break;
			case 4: classes.push("button--hover--info"); break;
			case 5: classes.push("button--hover--success"); break;
			default : classes.push("button--hover--primary");
		}

		if(props.extraStyle) classes.push(props.extraStyle)

		return classes.join(' ', ", ")
	}

	return (
		<div className={getClasses()} onClick={props.onClickHandler}>
			{props.text}
		</div>
	)
}

export default HoverButton 