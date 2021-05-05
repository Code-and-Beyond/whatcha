import {
	SHOW_PROFILE,
	SHOW_CONNECTIONS,
	SHOW_SELECTED_PROFILE
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

		case SHOW_CONNECTIONS:
			return {
				...state,
				show: 'connections',
			};
		case SHOW_SELECTED_PROFILE:
			return {
				...state,
				show: 'selected',
			};

		default:
			return state;
	}
};

export default handleToggle;