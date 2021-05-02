import {
	TOGGLE_LOGGED_IN,
	FETCH_USER_CONNECTIONS_START,
	FETCH_USER_CONNECTIONS_SUCCESS,
	FETCH_USER_CONNECTIONS_FAILED,
	FETCH_ALL_USERS_START,
	FETCH_ALL_USERS_SUCCESS,
	FETCH_ALL_USERS_FAILED
} from "../actions/actionTypes";

const initialState = {
	loggedIn: false,
	connections: [],
	users: '',
	loading: false,
	error: ''
};

const containsObject = (obj, list) => {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i].id === obj.id) {
			return true;
		}
	}
	return false;
};

const getNonFollowers = (allUsers, connections) => {
	let nonFollowers = [];
	allUsers.forEach((user) => {
		if (!containsObject(user, connections)) {
			nonFollowers.push(user);
		}
	});
	// console.log(connections, nonFollowers);
	return nonFollowers;
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				loggedIn: action.loggedIn,
			};
		case FETCH_USER_CONNECTIONS_START:
			return {
				...state,
				loading: true
			};
		case FETCH_USER_CONNECTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				connections: action.connections
			};
		case FETCH_USER_CONNECTIONS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_ALL_USERS_START:
			return {
				...state,
				loading: true,
			};
		case FETCH_ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: getNonFollowers(action.usersList, state.connections)
			};
		case FETCH_ALL_USERS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default handleToggle;