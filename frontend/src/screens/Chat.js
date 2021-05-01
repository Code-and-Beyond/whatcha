import { useState } from 'react';
import ChatContact from '../components/Chat/ChatContact';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatSpace from '../components/Chat/ChatSpace';

const Chat = () => {
	const [openChat, setOpenChat] = useState(false);

	const getRequiredChatSpace = () => {
		return <ChatSpace />;
	};

	const getConnections = () => (
		<div>
			<h1 className='b b--3 u-m-v-m text--center h--disabled'>Your connections will appear here</h1>
			<ChatContact name='Ramji Rathore' handleClick={ () => setOpenChat(true) } />
			<ChatContact name='Hemant Panwar' handleClick={ () => setOpenChat(true) } />
			<ChatContact name='Prerna Singh' handleClick={ () => setOpenChat(true) } />
			<ChatContact name='Sukant Arora' />
			<ChatContact name='Praveen Mishra' />
			<ChatContact name='Shreyansh chouhan' />
			<ChatContact name='Priyansh Nigam' />
			<ChatContact name='Rishik Sood' />
		</div>
	);

	return (
		<div>
			<ChatHeader openChat={ openChat } user={ { fname: 'Hemant Panwar' } } goBack={ () => setOpenChat(false) } />
			{openChat ? getRequiredChatSpace() : getConnections() }
		</div>
	);
};

export default Chat;
