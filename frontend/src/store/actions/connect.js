import * as actionTypes from './actionTypes';

export const fetchChatsStart = () => {
	return {
		type: actionTypes.FETCH_CHATS_START,
	};
};

export const fetchChatsSuccess = (chats) => {
	return {
		type: actionTypes.FETCH_CHATS_SUCCESS,
		allChats: chats
	};

};

export const fetchChatsFailure = (msg) => {
	return {
		type: actionTypes.FETCH_CHATS_FAILURE,
		message: msg
	};
};

export const fetchChats = () => {
	fetchChatsStart();
	fetchChatsSuccess([]);
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