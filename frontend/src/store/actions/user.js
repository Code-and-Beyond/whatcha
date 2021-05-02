import * as actionTypes from './actionTypes';
import axios from 'axios';

export const toggleLoggedIn = (loggedin) => {
	return {
		type: actionTypes.TOGGLE_LOGGED_IN,
		loggedIn: loggedin
	};
};

export const fetchUserConnectionsStart = () => {
	return {
		type: actionTypes.FETCH_USER_CONNECTIONS_START,
	};
};


export const fetchUserConnectionsSuccess = (connections) => {
	return {
		type: actionTypes.FETCH_USER_CONNECTIONS_SUCCESS,
		connections
	};
};


export const fetchUserConnectionsFailed = (error) => {
	return {
		type: actionTypes.FETCH_USER_CONNECTIONS_SUCCESS,
		error
	};
};

export const initUserConnections = (uid) => {
	return (dispatch) => {
		dispatch(fetchUserConnectionsStart());
		axios
			.get('http://localhost:8080/api/pub/connection/' + uid)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					dispatch(fetchUserConnectionsSuccess(res.data.data, uid));
				}
			})
			.catch(err => dispatch(fetchUserConnectionsFailed(err)));
	};
};



export const fetchAllUsersStart = () => {
	return {
		type: actionTypes.FETCH_ALL_USERS_START,
	};
};


export const fetchAllUsersSuccess = (usersList, currUser) => {
	return {
		type: actionTypes.FETCH_ALL_USERS_SUCCESS,
		usersList: usersList.filter(user => user.id !== currUser)
	};
};

export const fetchAllUsersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ALL_USERS_FAILED,
		error
	};
};

export const initAllUsers = (currUser) => {
	return (dispatch) => {
		dispatch(fetchAllUsersStart());
		axios
			.get('http://localhost:8080/api/pub/allUsers')
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					dispatch(fetchAllUsersSuccess(res.data.data, currUser));
				}
			})
			.catch(err => dispatch(fetchAllUsersFailed(err)));
	};
};

export const followUser = (uid1, uid2) => {
	return () => {
		axios
			.post('http://localhost:8080/api/pub/connection/' + uid1 + '/' + uid2)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					initAllUsers();
					console.log('followed');
				}
			})
			.catch(err => console.log(err));
	};
};

export const unfollowUser = (uid1, uid2) => {
	return () => {
		console.log(uid1, uid2);
		axios

			.delete('http://localhost:8080/api/pub/connection/' + uid1 + '/' + uid2)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					initUserConnections();
					console.log('unfollowed');
				}
			})
			.catch(err => console.log(err));
	};
};