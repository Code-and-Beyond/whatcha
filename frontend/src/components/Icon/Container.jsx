import React from 'react';

import Icon from './Icon';

const IconContainer = (props) => {
	const { text, color, src, alt } = props;

	const getContainerClasses = () => {
		let classesContainer = ['icon--container u-c-pointer'];
		if (props.extraStyleC) classesContainer.push(props.extraStyleC);
		return classesContainer.join(' ', ', ');
	};

	const getIconClasses = () => {
		let classesIcon = ['icon--m'];
		if (props.extraStyleI) classesIcon.push(props.extraStyleI);
		return classesIcon.join(' ', ', ');

	};

	return (
		<div
			className={ getContainerClasses() }
			style={ { background: color } }
			onClick={ props.onClickHandler }
		>
			<Icon extraStyle={ getIconClasses() } src={ src } alt={ alt } />
			<div className="d__w--100 d--f ai--c jc--c">
				<h1 className="h--white h h--3 u-c-pointer">{ text }</h1>
			</div>
		</div>
	);
};

export default IconContainer;
