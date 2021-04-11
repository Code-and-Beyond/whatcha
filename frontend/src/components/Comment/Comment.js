import React from 'react';
import Avatar from '../Avatar/Avatar';

import user from '../../assets/profile/user.svg';

import NoFillButton from '../Button/NoFIll';
import Row from '../Row/Row';

const Comment = () => {
	return (
		<Row extraStyle='u-m-v-s'>
			<Avatar src={ user } alt='user avatar' size='4.5rem' />
			<div className='comment'>
				<div className='comment__container'>
					<Row ai='c' jc='sb'>
						<h2 className='b b--3 text--black'>Prena Singh</h2>
						<p className='b b--4 text--black'>7h ago</p>
					</Row>
					<p className='b b--4 text--black'>Competitive Coder, DSA, React</p>
					<p className='comment__body b b--3'>Working on Whatcha!</p>
				</div>
				<p className='comment__button u-c-pointer b b--4'>Reply</p>
			</div>
		</Row>
	);
};

export default Comment;;
