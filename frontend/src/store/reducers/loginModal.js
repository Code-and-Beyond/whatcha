import { TOGGLE_LOGIN_MODAL } from "../actions/actionTypes";

const initialState = {
	visible: false,
	redirect: null
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGIN_MODAL:
			if (action.redirect !== null)
				return {
					...state,
					visible: action.visible,
					redirect: action.redirect
				};
			else {
				return {
					...state,
					visible: action.visible,
				};
			}
		default:
			return state;
	}
};

export default handleToggle;