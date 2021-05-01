import React from 'react';

const ChatMessage = (props) => {
	const { receive } = props;

	const getMessage = () => {
		return receive ?
			<div className='message message__received'>
				<p className='b b--3'>Nothing much! You tell XD</p>
				<p className='b b--4 u-m-l-m u-p-t-s'>8:47</p>
				<div className='message__received--arrow' />
			</div>
			:
			<div className='message message__sent u-m-l-auto'>
				<p className='b b--3'>Hey whatcha doin? </p>
				<p className='b b--4 u-m-l-m u-p-t-s'>8:43</p>
				<div className='message__sent--arrow' />
			</div>;
	};


	return (
		getMessage()
	);
};

export default ChatMessage;
