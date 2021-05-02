import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reportWebVitals from './reportWebVitals';

import loadingReducer from './store/reducers/loading';
import userReducer from './store/reducers/user';
import loginModalReducer from './store/reducers/loginModal';
import alertReducer from './store/reducers/snackbar';
import featureReducer from './store/reducers/features';
import connectReducer from './store/reducers/connect';



const rootReducer = combineReducers({
	loadingState: loadingReducer,
	loginModalState: loginModalReducer,
	alertState: alertReducer,
	userState: userReducer,
	featureState: featureReducer,
	connectState: connectReducer
});

const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={ store }>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
