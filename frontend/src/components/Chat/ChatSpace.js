import React, { useState, useEffect } from 'react';
import TextBox from '../TextBox/TextBox';

import Message from './ChatMessage';
import IconContainer from '../Icon/Container';

import sendButton from '../../assets/icons/send-button.svg';
import io from 'socket.io-client';
import axios from 'axios';

let socket;
const ChatSpace = ({ chatRoom, currentUserId }) => {
    const [text, setText] = useState('');
    const [receiverSocket, setReceiverSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [initialised, setInitialised] = useState(false);

    const ENDPOINT = 'http://localhost:8080';
    useEffect(() => {
        if (!initialised) {
            axios({
                method: 'GET',
                url: `${ENDPOINT}/api/pub/chat/${chatRoom.chatRoomId}/messages`,
            })
                .then((res) => {
                    if (res.status === 200 && !res.data.error) {
                        console.log(res.data.data);
                        setMessages(res.data.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            socket = io(ENDPOINT);

            socket.emit(
                'join',
                { userId: currentUserId, chatRoomId: chatRoom.chatRoomId },
                (resChatRoom) => {
                    if (
                        currentUserId !== resChatRoom.userOne &&
                        resChatRoom.socketOne !== undefined
                    )
                        setReceiverSocket(resChatRoom.socketOne);
                    else if (
                        currentUserId !== resChatRoom.userTwo &&
                        resChatRoom.socketTwo !== undefined
                    )
                        setReceiverSocket(resChatRoom.socketTwo);
                }
            );
            setInitialised(true);
        }

        socket.on('receiverAvailable', (receiverSocket) => {
            setReceiverSocket(receiverSocket);
        });

        socket.on('message', (newMessage) => {
            console.log(socket.id, 'message');
            setMessages([...messages, newMessage]);
        });
    }, [chatRoom.chatRoomId, currentUserId, messages, initialised]);

    const handleTextChange = (message) => {
        setText(message);
    };

    const handleSend = (e) => {
        const messageObj = {
            chatRoomId: chatRoom.chatRoomId,
            sender: currentUserId,
            receiver:
                currentUserId === chatRoom.userOne
                    ? chatRoom.userTwo
                    : chatRoom.userOne,
            receiverSocket,
            text,
        };
        socket.emit('sendMessage', { message: messageObj });
    };

    return (
        <div className="chat__space">
            <div className="chat__space--messages u-p-v-s u-p-h-m">
                {messages.map((message) =>
                    message.sender === currentUserId ? (
                        <Message
                            key={message.messageId}
                            text={message.text}
                            time={message.time}
                        />
                    ) : (
                        <Message
                            key={message.messageId}
                            receive
                            text={message.text}
                            time={message.time}
                        />
                    )
                )}
            </div>
            <div className="chat__space--keyboard">
                <TextBox
                    value={text}
                    placeholder="Type a message"
                    rows={1}
                    handleChange={handleTextChange}
                />
                <IconContainer
                    src={sendButton}
                    onClickHandler={handleSend}
                    extraStyleI="chat__space--keyboard-send icon--s"
                />
            </div>
        </div>
    );
};

export default ChatSpace;
