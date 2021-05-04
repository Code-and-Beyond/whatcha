import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../helpers/session';
import { initUserConnections, initAllUsers, followUser, unfollowUser, createChatRoom } from '../store/actions/index';

import Connection from '../components/Features/Connection';

const ConnectionsScreen = () => {
	const dispatch = useDispatch();
	const userConnections = useSelector(state => state.userState.connections);
	const allUsers = useSelector(state => state.userState.users);
	const [currUser, setCurrUser] = useState('');
	const [active, setActive] = useState(0);

	useEffect(() => {
		console.log('conrun');
		if (getUser()) {
			dispatch(initUserConnections(getUser().id));
			setCurrUser(getUser().id);
			if (active) {
				dispatch(initAllUsers(getUser().id));
			}
		}
	}, [dispatch, active]);


	const onFollowUser = (id) => {
		dispatch(followUser(currUser, id));
		dispatch(createChatRoom(currUser, id));
		setActive(0);
	};

	const onUnFollowUser = (id) => {
		dispatch(unfollowUser(currUser, id));
		setActive(1);
	};

	const getHeader = () => (
		<div className='connection__container--head'>
			<h1 className={ !active ? 'active' : null + ' h h--4' } onClick={ () => setActive(0) }><strong>Connections</strong></h1>
			<h1 className={ active ? 'active' : null + ' h h--4' } onClick={ () => setActive(1) }><strong>Explore</strong></h1>
		</div>
	);

	const getConnections = () => {
		if (active) {
			return allUsers.length &&
				allUsers.map((connection) =>
					<Connection key={ connection.id } { ...connection } active={ active } currUser={ currUser } onFollowUser={ onFollowUser } onUnFollowUser={ onUnFollowUser } />
				);
		} else {
			return userConnections.length &&
				userConnections.map((connection) =>
					<Connection key={ connection.id } { ...connection } active={ active } currUser={ currUser } onFollowUser={ onFollowUser } onUnFollowUser={ onUnFollowUser } />
				);
		}
	};

	return (
		<div className='connection__container profile'>
			{getHeader() }
			{getConnections() }
		</div>
	);
};

export default ConnectionsScreen;
