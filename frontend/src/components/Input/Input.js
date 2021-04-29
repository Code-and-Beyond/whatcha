import React from 'react';

const Input = (props) => {
	const { value, placeholder, type } = props;
	const getClasses = () => {
		let classes = ['input'];

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(' ', ', ');
	};

	return (
		<input
			type={ type ? type : "text" }
			placeholder={ placeholder }
			className={ getClasses() }
			value={ value }
			onChange={ (e) => props.handleInput(e.target.value) }
		/>
	);
};

export default Input;
