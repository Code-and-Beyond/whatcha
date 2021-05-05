import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchChatsStart = () => {
    return {
        type: actionTypes.FETCH_CHATS_START,
    };
};

export const fetchChatsSuccess = (chatRooms) => {
    return {
        type: actionTypes.FETCH_CHATS_SUCCESS,
        rooms: chatRooms,
    };
};

export const fetchChatsFailure = (msg) => {
    return {
        type: actionTypes.FETCH_CHATS_FAILURE,
        message: msg,
    };
};

export const fetchChatsRooms = (currUserId) => {
    return (dispatch) => {
        dispatch(fetchChatsStart());
        axios({
            method: 'GET',
            url: `http://localhost:8080/api/pub/chat?uid=${currUserId}`,
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    console.log(res.data.data);
                    dispatch(fetchChatsSuccess(res.data.data));
                }
            })
            .catch((err) => {
                dispatch(fetchChatsFailure(err));
            });
    };
};

export const updateChatRoomByUsers = (currUser, otherUser, body) => {
    return (dispatch) => {
        console.log('in updateChatRoom', currUser, otherUser, body);
        axios({
            url: `http://localhost:8080/api/pub/chat?userOne=${currUser}&userTwo=${otherUser}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data: body,
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    console.log(res.data);
                    dispatch(fetchChatsRooms(currUser));
                }
            })
            .catch((err) => console.log(err));
    };
};

export const createChatRoom = (currUser, otherUser) => {
    console.log('in createChatRoom', currUser, otherUser);
    return (dispatch) => {
        console.log(currUser, otherUser);
        axios({
            url: 'http://localhost:8080/api/pub/chat',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                userOne: currUser,
                userTwo: otherUser,
            },
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    console.log(res.data);
                    dispatch(fetchChatsRooms(currUser));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(
                    updateChatRoomByUsers(currUser, otherUser, {
                        connectionExists: true,
                    })
                );
            });
    };
};

// note: this is not being used anywhere
export const deleteChatRoom = (chatRoomId) => {
    return (dispatch) => {
        axios({
            url: 'http://localhost:8080/api/pub/chat/' + chatRoomId,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    // console.log(res.data);
                }
            })
            .catch((err) => console.log(err));
    };
};

export const showChats = () => {
    return {
        type: actionTypes.SHOW_CHATS,
    };
};

export const showCreateBlogs = () => {
    return {
        type: actionTypes.SHOW_CREATE_BLOGS,
    };
};
