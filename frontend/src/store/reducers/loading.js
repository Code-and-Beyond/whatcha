import { TOGGLE_LOADING, UPDATE_LOADING_TEXT } from '../actions/actionTypes';

const initialState = {
	visible: false,
	loader: 'default',
	text: 'Loading...'
};

const handleLoading = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				visible: action.visible,
				loader: action.loader,
				text: action.text
			};
		case UPDATE_LOADING_TEXT:
			return {
				...state,
				text: action.text
			};
		default:
			return state;
	}
};

export default handleLoading;