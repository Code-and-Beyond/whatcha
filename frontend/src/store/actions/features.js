import * as actionTypes from './actionTypes';

export const showProfile = () => {
	return {
		type: actionTypes.SHOW_PROFILE,
	};
};

export const showConnections = () => {
	return {
		type: actionTypes.SHOW_CONNECTIONS,
	};
};

export const showSelectedProfile = () => {
	return {
		type: actionTypes.SHOW_SELECTED_PROFILE
	};
};
