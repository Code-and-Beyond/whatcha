import React from 'react';

import Landing from './screens/Landing';
import Login from './components/Login/Login';

import './main.scss';

// import { getUser, isLoggedIn, setLogout } from './helpers/session';
// import checkAccess from './helpers/token';
// const checkTokens = () => { if (!isLoggedIn() || checkAccess().isExp || checkAccess().tknData.name !== getUser().username) setLogout(); };

const App = () => {
	return (
		<React.Fragment>
			<Landing />
			<Login />
		</React.Fragment>
	);
};

export default App;
