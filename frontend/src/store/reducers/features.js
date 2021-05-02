import {
	SHOW_PROFILE,
	SHOW_SAVED_POSTS,
	SHOW_CONNECTIONS
} from "../actions/actionTypes";

const initialState = {
	show: 'profile',
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_PROFILE:
			return {
				...state,
				show: 'profile',
			};

		case SHOW_SAVED_POSTS:
			return {
				...state,
				show: 'saved',
			};

		case SHOW_CONNECTIONS:
			return {
				...state,
				show: 'connections',
			};

		default:
			return state;
	}
};

export default handleToggle;