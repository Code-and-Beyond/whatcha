import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../helpers/session';
import { toggleLoggedIn } from '../store/actions/user';
import { toggleLoginModal } from '../store/actions/loginModal';

import Header from '../components/Header/LeftNav';
import Features from '../components/Features/Profile';
import Posts from './Posts';
import Chat from './Chat';


const HomeScreen = () => {
	const dispatch = useDispatch();
	const userState = useSelector(state => state.loggedInState);
	const userLogin = userState.loggedIn;

	useEffect(() => {
		console.log(userLogin);
		if (!isLoggedIn()) {
			dispatch(toggleLoggedIn(false));
			dispatch(toggleLoginModal(true));
		}
	}, [dispatch, userLogin]);

	return (
		<div className="home">
			<Header />
			<Features />
			<Posts />
			<Chat />
		</div>
	);
};

export default HomeScreen;
