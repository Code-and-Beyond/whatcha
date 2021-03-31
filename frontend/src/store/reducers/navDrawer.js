import { TOGGLE_NAV_DRAWER } from "../actions/navDrawer";

const initalState = {
	visible: false,
};

const handleToggle = (state = initalState, action) => {
	switch (action.type) {
		case TOGGLE_NAV_DRAWER:
			const prevState = state;
			return {
				...state,
				visible: !prevState.visible,
			};
		default:
			break;
	}
	return state;
};

export default handleToggle;