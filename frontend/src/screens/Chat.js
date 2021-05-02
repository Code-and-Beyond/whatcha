import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../helpers/session';

import ChatContact from '../components/Chat/ChatContact';
import ChatHeader from '../components/Chat/ChatHeader';
import ChatSpace from '../components/Chat/ChatSpace';

const Chat = () => {
    const [openChat, setOpenChat] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [currChatRoom, setCurrChatRoom] = useState('');

    useEffect(() => {
        const currentUserId = getUser() ? getUser().id : '';
        // fetching chat rooms
        axios({
            method: 'GET',
            url: `http://localhost:8080/api/pub/chat?uid=${currentUserId}`,
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    console.log(res.data.data);
                    setChatList(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChatClick = (chatRoom) => {
        setOpenChat(true);
        setCurrChatRoom(chatRoom);
    };

    const getRequiredChatSpace = () => {
        return (
            <ChatSpace chatRoom={currChatRoom} currentUserId={getUser().id} />
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
                          dp={connection.image}
                          key={connection.id}
                          name={connection.fullname}
                          handleClick={() => handleChatClick(connection)}
                      />
                  ))
                : null}
        </div>
    );

    return (
        <div>
            <ChatHeader
                openChat={openChat}
                user={{ fname: 'Hemant Panwar' }}
                goBack={() => setOpenChat(false)}
            />
            {openChat ? getRequiredChatSpace() : getConnections()}
        </div>
    );
};

export default Chat;
