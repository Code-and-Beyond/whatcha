import * as actionTypes from './actionTypes';

export const toggleLoginModal = (visible, redirect = null) => {
	return {
		type: actionTypes.TOGGLE_LOGIN_MODAL,
		visible: visible,
		redirect: redirect
	};
};