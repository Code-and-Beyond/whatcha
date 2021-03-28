import React from 'react';

import Icon from './Icon';

const IconContainer = (props) => {
	const { text, color, src, alt } = props;
	return (
		<div className='icon--container u-c-pointer' style={ { background: color } } onClick={ props.onClickHandler }>
			<Icon extraStyle='icon--m' src={ src } alt={ alt } />
			<div className="d__w--100 d--f ai--c jc--c">
				<h1 className='h--white h h--2'>{ text }</h1>
			</div>
		</div>
	);
};

export default IconContainer;
