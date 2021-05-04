import React from 'react';
import { useSelector } from 'react-redux';
import CreateBlogs from '../components/Blogs/CreateBlogs';
import Chat from './Chat';

const ConnectScreen = () => {
	const show = useSelector(state => state.connectState.show);

	const getWindow = () => {
		switch (show) {
			case 'chats':
				return <Chat />;
			case 'blogs':
				return <CreateBlogs />;
			default:
				return;
		}
	};

	return (
		<div className='connect'>
			{getWindow() }
		</div>
	);
};

export default ConnectScreen;
