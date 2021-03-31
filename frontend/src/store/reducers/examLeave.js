import { TOGGLE_EXAM_LEAVE_MODAL } from "../actions/examLeave";

const initalState = {
	visible: false
}

const handleToggle = (state = initalState, action) => {
	switch (action.type) {
		case TOGGLE_EXAM_LEAVE_MODAL:
			return{
				...state,
				visible: action.visible,
			}
		default:
			break;
	}
	return state
}

export default handleToggle