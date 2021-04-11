import { TOGGLE_LOGIN_MODAL } from "../actions/loginModal";

const initalState = {
	visible: false,
	redirect: null
};

const handleToggle = (state = initalState, action) => {
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
			break;
	}
	return state;
};

export default handleToggle;