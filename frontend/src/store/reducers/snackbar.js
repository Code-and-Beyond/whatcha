import { SET_ALERT } from "../actions/snackbar";

const initialState = {
	type: 0,
	show: false,
	text: ''
};

const handleSnackbar = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				type: action.alertType,
				show: action.show,
				text: action.text
			};

		default:
			return state;
	}

};

export default handleSnackbar;