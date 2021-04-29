import React from 'react';
import { useSelector } from 'react-redux';
import CreateBlogs from '../components/Blogs/CreateBlogs';

const ChatScreen = () => {
	const show = useSelector(state => state.connectState.show);

	const getWindow = () => {
		switch (show) {
			case 'chats':
				console.log('chats');
				break;
			case 'blogs':
				return <CreateBlogs />;
			default:
				return;
		}
	};

	return (
		<div className="chat">
			{getWindow() }
		</div>
	);
};

export default ChatScreen;
