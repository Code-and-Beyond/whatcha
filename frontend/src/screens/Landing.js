import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, getUser } from '../helpers/session';
import { toggleLoggedIn } from '../store/actions/user';
import { toggleLoginModal } from '../store/actions/loginModal';

import FeaturesHeader from '../components/Header/Features';
import Profile from '../components/Features/Profile';
import Connections from './Connections';
import Posts from './Posts';
import Connect from './Connect';
import { fetchChatsRooms } from '../store/actions';


const HomeScreen = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector(state => state.userState.loggedIn);
	const feature = useSelector(state => state.featureState.show);

	useEffect(() => {
		if (!isLoggedIn()) {
			dispatch(toggleLoggedIn(false));
			dispatch(toggleLoginModal(true));
		} else {
			dispatch(toggleLoggedIn(true));
		}

		if (getUser()) {
			dispatch(fetchChatsRooms(getUser().id));
		}

		console.log('landing');
	}, [dispatch, userLogin]);


	const getComponent = () => {
		switch (feature) {
			case 'profile':
				return <Profile />;
			case 'connections':
				return <Connections />;
			default:
				return <Profile />;
		}
	};

	const getLanding = () => (
		<div className="home">
			<FeaturesHeader />
			{ getComponent() }
			<Posts />
			<Connect />
		</div>
	);


	return (
		userLogin ? getLanding() : null
	);
};

export default HomeScreen;
