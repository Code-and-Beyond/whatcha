import Avatar from '../Avatar/Avatar';

import user from '../../assets/profile/user.svg';

const ChatContact = (props) => {
	const { name, dp } = props;
	return (
		<div className='chat__contact' onClick={ props.handleClick }>
			<Avatar
				src={ dp ? dp : user }
				extraStyle="u-c-pointer"
				alt="user avatar"
				size='5rem'
			/>
			<div className='u-m-l-m'>
				<p className='h h--5 '>{ name }</p>
				<p className='b b--3'>Yes chat is still going on?</p>
			</div>
			<p className='b b--3 u-m-l-auto'>10:49</p>
		</div>
	);
};

export default ChatContact;
