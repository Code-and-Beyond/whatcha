import moment from 'moment';
import Avatar from '../Avatar/Avatar';

import user from '../../assets/profile/user.svg';

const ChatContact = (props) => {
	const { fullname, image, time, text, latestMessageId } = props;
	const msgTime = moment(time).calendar();

	const getLastText = (lastText) => {
		return lastText.length < 40 ? lastText : lastText.substring(0, 37) + '...';
	};

	return (
		<div className='chat__contact' onClick={ props.handleClick }>
			<Avatar
				src={ image ? image : user }
				extraStyle="u-c-pointer"
				alt="user avatar"
				size='5rem'
			/>
			<div className='u-m-l-m'>
				<p className='h h--5 '>{ fullname }</p>
				{ text !== '' && <p className='b b--3'>{ getLastText(text) }</p> }
			</div>
			{latestMessageId !== 'whatcha' &&
				<p className='b b--3 u-m-l-auto'>{ msgTime }</p>
			}
		</div>
	);
};

export default ChatContact;
