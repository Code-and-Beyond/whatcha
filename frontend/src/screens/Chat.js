import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../helpers/session';

import { fetchChatsRooms } from '../store/actions/index';
import ChatContact from '../components/Chat/ChatContact';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatSpace from '../components/Chat/ChatSpace';

const Chat = () => {
	const dispatch = useDispatch();
	const chatList = useSelector(state => state.connectState.chatRooms);
	const [openChat, setOpenChat] = useState(false);

	const [currChatRoom, setCurrChatRoom] = useState('');

	useEffect(() => {
		if (getUser()) {
			dispatch(fetchChatsRooms(getUser().id));
		}
	}, [dispatch]);

	const handleChatClick = (chatRoom) => {
		setOpenChat(true);
		setCurrChatRoom(chatRoom);
	};

	const getRequiredChatSpace = () => {
		return (
			<ChatSpace chatRoom={ currChatRoom } currentUserId={ getUser().id } />
		);
	};

	const getConnections = () => (
		<div>
			<h1 className="b b--3 u-m-v-m text--center h--disabled">
				Your connections will appear here
            </h1>
			{chatList && chatList.length
				? chatList.map((connection) => (
					<ChatContact
						dp={ connection.image }
						key={ connection.id }
						name={ connection.fullname }
						handleClick={ () => handleChatClick(connection) }
					/>
				))
				: null }
		</div>
	);

	return (
		<div>
			<ChatHeader
				openChat={ openChat }
				user={ { fname: 'Hemant Panwar' } }
				goBack={ () => setOpenChat(false) }
			/>
			{openChat ? getRequiredChatSpace() : getConnections() }
		</div>
	);
};

export default Chat;
