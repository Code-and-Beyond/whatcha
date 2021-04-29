import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reportWebVitals from './reportWebVitals';

import loadingReducer from './store/reducers/loading';
import loggedInReducer from './store/reducers/user';
import loginModalReducer from './store/reducers/loginModal';
import alertReducer from './store/reducers/snackbar';
import connectReducer from './store/reducers/connect';



const rootReducer = combineReducers({
	loadingState: loadingReducer,
	loginModalState: loginModalReducer,
	alertState: alertReducer,
	loggedInState: loggedInReducer,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
