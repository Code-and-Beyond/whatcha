import React from 'react';
import Avatar from '../Avatar/Avatar';
// import IconContainer from '../Icon/Container';
import TextButton from '../Button/Text';

// import message from '../../assets/icons/message.svg';
// import { useDispatch } from 'react-redux';


const Connection = (props) => {
	const { image, fullname, bio, active, id } = props;
	// const dispatch = useDispatch();

	// const handleMessaging = () => {
	// 	// dispatch(messageUser(currUser, id));
	// };

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
				(
					<React.Fragment>
						{/* <IconContainer
							src={ message }
							onClickHandler={ handleMessaging }
							extraStyleI="connection__icon"
						/> */}
						<TextButton text='Unfollow' extraStyle='u-m-l-auto u-m-r-s a--2' type={ 2 } onClickHandler={ () => props.onUnFollowUser(id) } />
					</React.Fragment>
				)
			}
		</div>
	);
};

export default Connection;
