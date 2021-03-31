export const TOGGLE_LOGGED_IN = "TOGGLE_LOGGED_IN"

export const toggleLoggedIn = (loggedin) => {
	return {
		type: TOGGLE_LOGGED_IN,
		loggedIn: loggedin
	}
}