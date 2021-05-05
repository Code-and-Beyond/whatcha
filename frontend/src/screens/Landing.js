import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, getUser } from '../helpers/session';
import { fetchChatsRooms, toggleLoggedIn, toggleLoginModal, fetchProfile } from '../store/actions/index';

import FeaturesHeader from '../components/Header/Features';
import Profile from '../components/Features/Profile';
import Connections from './Connections';
import Posts from './Posts';
import Connect from './Connect';


const HomeScreen = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector(state => state.userState.loggedIn);
	const feature = useSelector(state => state.featureState.show);
	const selectedUserProfile = useSelector(state => state.userState.selectedUser);
	const mainProfile = useSelector(state => state.userState.mainUser);

	useEffect(() => {
		if (!isLoggedIn()) {
			dispatch(toggleLoggedIn(false));
			dispatch(toggleLoginModal(true));
		} else {
			dispatch(toggleLoggedIn(true));
		}

		if (getUser()) {
			dispatch(fetchProfile(getUser()));
			dispatch(fetchChatsRooms(getUser().id));
		}

		console.log('landing');
	}, [dispatch, userLogin]);


	const getComponent = () => {
		switch (feature) {
			case 'profile':
				return <Profile profile={ mainProfile } />;
			case 'connections':
				return <Connections />;
			case 'selected':
				return <Profile profile={ selectedUserProfile } />;
			default:
				return <Profile profile={ mainProfile } />;
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
