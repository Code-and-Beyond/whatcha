export const TOGGLE_LOGIN_MODAL = "TOGGLE_LOGIN_MODAL"

export const toggleLoginModal = (visible, redirect=null) => {
	return {
		type: TOGGLE_LOGIN_MODAL,
		visible: visible,
		redirect: redirect
	}
}