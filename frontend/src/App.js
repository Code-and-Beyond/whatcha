import Home from './screens/Home';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { getUser, isLoggedIn, setLogout } from './helpers/session';
import checkAccess from './helpers/token';


import Login from './components/Login/Login';

import loadingReducer from './store/reducers/loading';
import loggedInReducer from './store/reducers/user';
import loginModalReducer from './store/reducers/loginModal';
import alertReducer from './store/reducers/snackbar';

import './main.scss';


const rootReducer = combineReducers({
	loadingState: loadingReducer,
	loginModalState: loginModalReducer,
	alertState: alertReducer,
	loggedInState: loggedInReducer,
});

const store = createStore(rootReducer);

const checkTokens = () => { if (!isLoggedIn() || checkAccess().isExp || checkAccess().tknData.name !== getUser().username) setLogout(); };

const App = () => {
	return (
		<Provider store={ store }>
			{checkTokens() }
			<Home />
			<Login />
		</Provider>
	);
};

export default App;
