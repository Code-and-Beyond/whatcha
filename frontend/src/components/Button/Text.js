import React from 'react';

const TextButton = props => {

	const getClasses = () => {
		let classes = ["button button--text button--text--primary a a--1 u-c-pointer"];

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(' ', ", ");
	};

	return (
		<div className={ getClasses() } onClick={ props.onClickHandler }>
			{props.text }
		</div>
	);
};

export default TextButton;