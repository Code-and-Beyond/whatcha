import * as actionTypes from './actionTypes';

export const toggleLoading = (loading, loader = 'default', text = "Loading...") => {
	return {
		type: actionTypes.TOGGLE_LOADING,
		visible: loading,
		loader: loader,
		text: text
	};
};

export const updateLoadingText = (text) => {
	return {
		type: actionTypes.UPDATE_LOADING_TEXT,
		text: text
	};
};