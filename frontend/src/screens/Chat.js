import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../helpers/session';

import { fetchChatsRooms } from '../store/actions/index';
import ChatContact from '../components/Chat/ChatContact';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatSpace from '../components/Chat/ChatSpace';
import axios from 'axios';
import Search from '../components/Search/Search';

const ChatScreen = () => {
	const dispatch = useDispatch();
	const chatList = useSelector((state) => state.connectState.chatRooms);
	const [openChat, setOpenChat] = useState(false);

	const [currChatRoom, setCurrChatRoom] = useState('');

	const [searchPrefix, setSearchPrefix] = useState('');

	useEffect(() => {
		if (getUser()) {
			dispatch(fetchChatsRooms(getUser().id));
		}
	}, [dispatch, openChat]);

	const handleChatClick = (chatRoom) => {
		setOpenChat(true);
		setCurrChatRoom(chatRoom);
	};

	const getRequiredChatSpace = () => {
		const chatRoom = chatList.find(
			(connection) => connection.id === currChatRoom.id
		);
		console.log('in chat screen', chatRoom);
		return <ChatSpace chatRoom={ chatRoom } currentUserId={ getUser().id } />;
	};

	const getConnections = () => (
		<div>
			<div className="u-p-v-s u-p-h-s u-fw">
				<Search prefix={ searchPrefix } setPrefix={ setSearchPrefix } />
			</div>
			<div className="chat__space--messages">
				{ chatList && chatList.length
					? chatList.map((connection) =>
						connection.fullname
							.toLowerCase()
							.startsWith(searchPrefix) ? (
							<ChatContact
								{ ...connection }
								key={ connection.id }
								currentUserId={ getUser().id }
								handleClick={ () =>
									handleChatClick(connection)
								}
							/>
						) : null
					)
					: null }
			</div>
		</div>
	);

	const handleGoBack = () => {
		setOpenChat(false);
	};

	const deleteChat = (uid1, uid2, hideFor) => {
		axios({
			method: 'PUT',
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/messages`,
			data: {
				uid1,
				uid2,
				hideFor,
			},
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
					dispatch(fetchChatsRooms(hideFor));
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<ChatHeader
				openChat={ openChat }
				{ ...currChatRoom }
				goBack={ handleGoBack }
				deleteChat={ deleteChat }
			/>
			{openChat ? getRequiredChatSpace() : getConnections() }
		</div>
	);
};

export default ChatScreen;
