import { TOGGLE_NAV_DRAWER } from "../actions/navDrawer";

const initialState = {
	visible: false,
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_NAV_DRAWER:
			const prevState = state;
			return {
				...state,
				visible: !prevState.visible,
			};
		default:
			return state;
	}
};

export default handleToggle;