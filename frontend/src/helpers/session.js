/*	AUTH TOKENS	*/
export function getAccessToken() { return localStorage.getItem("acsTkn") }
export function setAccessToken(acsTkn) { if (acsTkn !== 'undefined' && acsTkn !== null) localStorage.setItem("acsTkn", acsTkn) }

export function getRefreshToken() { return localStorage.getItem("rfsTkn") }
export function setRefreshToken(rfsTkn) { if (rfsTkn !== 'undefined' && rfsTkn !== null) localStorage.setItem("rfsTkn", rfsTkn) }

/*	USER	*/
export function getUser() { return JSON.parse(localStorage.getItem("user")) }
export function setUser(user) { localStorage.setItem("user", JSON.stringify(user)) }

export function isLoggedIn() {
	if ((localStorage.getItem("acsTkn") !== null && localStorage.getItem("acsTkn") !== 'undefined') && (localStorage.getItem("rfsTkn") !== null && localStorage.getItem("rfsTkn") !== 'undefined') && (localStorage.getItem("user") !== null && localStorage.getItem("user") !== 'undefined'))
		return true
	return false
}

export function setLogout() { localStorage.clear() }
