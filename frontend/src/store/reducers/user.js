import { TOGGLE_LOGGED_IN } from "../actions/actionTypes";

const initialState = {
	loggedIn: false,
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				loggedIn: action.loggedIn,
			};
		default:
			break;
	}
	return state;
};

export default handleToggle;