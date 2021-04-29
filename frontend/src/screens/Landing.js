import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../helpers/session';
import { toggleLoggedIn } from '../store/actions/user';
import { toggleLoginModal } from '../store/actions/loginModal';

import FeaturesHeader from '../components/Header/Features';
import Profile from '../components/Features/Profile';
import Posts from './Posts';
import Connect from './Connect';


const HomeScreen = () => {
	const dispatch = useDispatch();
	const userState = useSelector(state => state.loggedInState);
	const userLogin = userState.loggedIn;

	useEffect(() => {
		if (!isLoggedIn()) {
			dispatch(toggleLoggedIn(false));
			dispatch(toggleLoginModal(true));
		}
	}, [dispatch, userLogin]);

	return (
		<div className="home">
			<FeaturesHeader />
			<Profile />
			<Posts />
			<Connect />
		</div>
	);
};

export default HomeScreen;
