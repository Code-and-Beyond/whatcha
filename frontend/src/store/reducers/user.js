import { TOGGLE_LOGGED_IN } from "../actions/user";

const initalState = {
	loggedIn: false,
};

const handleToggle = (state = initalState, action) => {
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