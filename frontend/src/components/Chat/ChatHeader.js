import Avatar from '../Avatar/Avatar';

import { getUser } from '../../helpers/session';

import userProfile from '../../assets/profile/user.svg';
import dots from '../../assets/icons/dots.svg';
import leftArrow from '../../assets/icons/left-arrow.svg';

const ChatHeader = (props) => {
	const { openChat, user } = props;

	const goBack = () => {
		return openChat ? <img
			src={ leftArrow }
			className="chat__header--icon u--icon"
			alt="go back"
			onClick={ props.goBack }
		/> : null;
	};
	return (
		<div className='chat__header'>
			{goBack() }
			<Avatar
				src={ openChat && getUser() ? userProfile : getUser().image }
				extraStyle="u-c-pointer"
				alt="user avatar"
				size='5rem'
			/>
			<h1 className='b b--1 u-m-l-s'>{ openChat ? user.fname : 'You' }</h1>
			<div className="chat__header--container u-c-pointer">
				<img
					src={ dots }
					alt="three dots"
					className="chat__header--dots"
				/>
			</div>
		</div >
	);
};

export default ChatHeader;
