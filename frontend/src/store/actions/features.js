import * as actionTypes from './actionTypes';

export const showProfile = () => {
	return {
		type: actionTypes.SHOW_PROFILE,
	};
};

export const showSavePosts = () => {
	return {
		type: actionTypes.SHOW_SAVED_POSTS,
	};
};

export const showConnections = () => {
	return {
		type: actionTypes.SHOW_CONNECTIONS,
	};
};
