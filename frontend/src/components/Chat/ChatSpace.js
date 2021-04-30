import { useState } from 'react';
import TextBox from '../TextBox/TextBox';

import IconContainer from '../Icon/Container';

import sendButton from '../../assets/icons/send-button.svg';

const ChatSpace = () => {
	const [text, setText] = useState('');

	const handleTextChange = (message) => {
		setText(message);
	};

	return (
		<div className='chat__space'>
			<h1 className='b b--3'>
				Hi'm chat space
			</h1>
			<div className='chat__space--keyboard'>
				<TextBox value={ text } placeholder='Type a message' rows={ 1 } handleChange={ handleTextChange } />
				<IconContainer src={ sendButton } extraStyleI='chat__space--keyboard-send icon--s' />
			</div>
		</div>
	);
};

export default ChatSpace;
