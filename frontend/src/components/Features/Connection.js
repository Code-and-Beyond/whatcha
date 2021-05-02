import React from 'react';
import Avatar from '../Avatar/Avatar';


import TextButton from '../Button/Text';


const Connection = (props) => {
	const { image, fullname, bio, active, id } = props;
	return (
		<div className='connection card'>
			<div className='connection__profile u-c-pointer'>
				<Avatar
					src={ image }
					alt="user avatar"
					size='5rem'
				/>
			</div>
			<div className='connection__name u-m-l-s'>
				<h3 className='a a--2'>{ fullname }</h3>
				<p className='b b--3 h--disabled'>{ bio ? bio : null }</p>
			</div>
			{active ?
				<TextButton text='Follow' extraStyle='u-m-l-auto u-m-r-s a--2' type={ 1 } onClickHandler={ () => props.onFollowUser(id) } />
				:
				<TextButton text='Unfollow' extraStyle='u-m-l-auto u-m-r-s a--2' type={ 2 } onClickHandler={ () => props.onUnFollowUser(id) } />
			}
		</div>
	);
};

export default Connection;
