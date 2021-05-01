import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from '../helpers/session';
import { toggleLoggedIn } from '../store/actions/user';
import { toggleLoginModal } from '../store/actions/loginModal';

import FeaturesHeader from '../components/Header/Features';
import Profile from '../components/Features/Profile';
import Connections from '../components/Features/Connections';
import Posts from './Posts';
import Connect from './Connect';


const HomeScreen = () => {
	const dispatch = useDispatch();
	const userState = useSelector(state => state.loggedInState);
	const userLogin = userState.loggedIn;
	const feature = useSelector(state => state.featureState.show);

	useEffect(() => {
		if (!isLoggedIn()) {
			dispatch(toggleLoggedIn(false));
			dispatch(toggleLoginModal(true));
		}
	}, [dispatch, userLogin]);


	const getComponent = () => {
		console.log(feature);
		switch (feature) {
			case 'profile':
				return <Profile />;
			case 'connections':
				return <Connections />;
			default:
				return <Profile />;
		}
	};


	return (
		<div className="home">
			<FeaturesHeader />
			{getComponent() }
			<Posts />
			<Connect />
		</div>
	);
};

export default HomeScreen;
