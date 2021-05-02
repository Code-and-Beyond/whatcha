import React from 'react';
import moment from 'moment';

const ChatMessage = ({ receive, text, time }) => {

	const msgTime = moment(time).calendar();

	const getMessage = () => {
		return receive ? (
			<div className="message message__received">
				<p className="b b--3">{ text }</p>
				<p className="b b--4 u-m-l-m u-p-t-s">{ msgTime }</p>
				<div className="message__received--arrow" />
			</div>
		) : (
			<div className="message message__sent u-m-l-auto">
				<p className="b b--3">{ text }</p>
				<p className="b b--4 u-m-l-m u-p-t-s">{ msgTime }</p>
				<div className="message__sent--arrow" />
			</div>
		);
	};

	return getMessage();
};

export default ChatMessage;
