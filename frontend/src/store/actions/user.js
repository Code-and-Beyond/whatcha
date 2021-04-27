import * as actionTypes from './actionTypes';

export const toggleLoggedIn = (loggedin) => {
	return {
		type: actionTypes.TOGGLE_LOGGED_IN,
		loggedIn: loggedin
	};
};