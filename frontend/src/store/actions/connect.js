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
		rooms: chatRooms
	};

};

export const fetchChatsFailure = (msg) => {
	return {
		type: actionTypes.FETCH_CHATS_FAILURE,
		message: msg
	};
};

export const fetchChatsRooms = (currentUserId) => {
	return (dispatch) => {
		dispatch(fetchChatsStart());
		axios({
			method: 'GET',
			url: `http://localhost:8080/api/pub/chat?uid=${currentUserId}`,
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					// console.log(res.data.data);
					dispatch(fetchChatsSuccess(res.data.data));
				}
			})
			.catch((err) => {
				dispatch(fetchChatsFailure(err));
			});

	};
};

export const createChatRoom = (uid1, uid2) => {
	return (dispatch) => {
		console.log(uid1, uid2);
		axios({
			url: "http://localhost:8080/api/pub/chat",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				userOne: uid1,
				userTwo: uid2,
			},

		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				console.log(res.data);
				dispatch(fetchChatsRooms(uid1));
			}
		}).catch((err) => console.log(err));
	};
};

export const deleteChatRoom = (chatRoomId) => {
	return (dispatch) => {
		axios({
			url: "http://localhost:8080/api/pub/chat/" + chatRoomId,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},

		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				// console.log(res.data);
			}
		}).catch((err) => console.log(err));
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