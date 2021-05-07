import * as actionTypes from './actionTypes';
import axios from 'axios';

export const toggleLoggedIn = (loggedin) => {
	return {
		type: actionTypes.TOGGLE_LOGGED_IN,
		loggedIn: loggedin,
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
		connections,
	};
};

export const fetchUserConnectionsFailed = (error) => {
	return {
		type: actionTypes.FETCH_USER_CONNECTIONS_SUCCESS,
		error,
	};
};

export const initUserConnections = (currUser) => {
	return (dispatch) => {
		dispatch(fetchUserConnectionsStart());
		axios
			.get(`${process.env.REACT_APP_ENDPOINT}/api/pub/connection/` + currUser)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					dispatch(
						fetchUserConnectionsSuccess(res.data.data, currUser)
					);
				}
			})
			.catch((err) => dispatch(fetchUserConnectionsFailed(err)));
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
		usersList: usersList.filter((user) => user.id !== currUser),
	};
};

export const fetchAllUsersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ALL_USERS_FAILED,
		error,
	};
};

export const initAllUsers = (currUser) => {
	return (dispatch) => {
		dispatch(fetchAllUsersStart());
		axios
			.get(`${process.env.REACT_APP_ENDPOINT}/api/pub/allUsers`)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					dispatch(fetchAllUsersSuccess(res.data.data, currUser));
				}
			})
			.catch((err) => dispatch(fetchAllUsersFailed(err)));
	};
};

export const followUser = (currUser, otherUser) => {
	return () => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/api/pub/connection/` +
				currUser +
				'/' +
				otherUser
			)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					// initAllUsers();
					console.log('followed');
				}
			})
			.catch((err) => console.log(err));
	};
};

export const unfollowUser = (currUser, otherUser) => {
	return () => {
		console.log(currUser, otherUser);
		axios

			.delete(
				`${process.env.REACT_APP_ENDPOINT}/api/pub/connection/` +
				currUser +
				'/' +
				otherUser
			)
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					// initUserConnections();
					console.log('unfollowed');
				}
			})
			.catch((err) => console.log(err));
	};
};


export const fetchProfile = (user) => {
	return (dispatch) => {
		dispatch({ type: actionTypes.FETCH_PROFILE_START });
		axios({
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/users/profile/` + user.id,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				// 'Authorization': 'Bearer ' + getAccessToken()
			}
		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				console.log(res.data.data);
				dispatch({
					type: actionTypes.FETCH_PROFILE_SUCCESS,
					mainUser: { ...res.data.data[0], ...user }
				});
			}
		}).catch((err) => {
			dispatch({ type: actionTypes.FETCH_PROFILE_FAILED });
			console.log(err);
		});
	};
};

export const setProfile = (user) => {
	return {
		type: actionTypes.SET_PROFILE,
		user
	};
};
