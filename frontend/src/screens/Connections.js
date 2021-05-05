import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../helpers/session';
import {
	initUserConnections,
	initAllUsers,
	followUser,
	unfollowUser,
	createChatRoom,
	updateChatRoomByUsers,
} from '../store/actions/index';

import Connection from '../components/Features/Connection';
import Search from '../components/Search/Search';

const ConnectionsScreen = () => {
	const dispatch = useDispatch();
	const userConnections = useSelector((state) => state.userState.connections);
	const allUsers = useSelector((state) => state.userState.users);
	const [currUser, setCurrUser] = useState('');
	const [active, setActive] = useState(0);

	const [searchPrefix, setSearchPrefix] = useState('');

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

	useEffect(() => {
		// console.log(active, searchPrefix);
		setSearchPrefix('');
	}, [active]);

	const onFollowUser = (id) => {
		dispatch(followUser(currUser, id));
		dispatch(createChatRoom(currUser, id));
		setActive(0);
	};

	const onUnFollowUser = (id) => {
		dispatch(unfollowUser(currUser, id));
		dispatch(
			updateChatRoomByUsers(currUser, id, { connectionExists: false })
		);
		setActive(1);
	};

	const getHeader = () => (
		<div className="connection__container--head">
			<h1
				className={ !active ? 'active' : null + ' h h--4' }
				onClick={ () => setActive(0) }
			>
				<strong>Connections</strong>
			</h1>
			<h1
				className={ active ? 'active' : null + ' h h--4' }
				onClick={ () => setActive(1) }
			>
				<strong>Explore</strong>
			</h1>
		</div>
	);

	const getConnectionEntity = (connection) =>
		connection.fullname.toLowerCase().startsWith(searchPrefix) ? (
			<Connection
				key={ connection.id }
				{ ...connection }
				connUser={ connection }
				active={ active }
				currUser={ currUser }
				onFollowUser={ onFollowUser }
				onUnFollowUser={ onUnFollowUser }
			/>
		) : null;

	const getConnections = () => {
		if (active) {
			return (
				allUsers.length &&
				allUsers.map((connection) => getConnectionEntity(connection))
			);
		} else {
			return (
				userConnections.length &&
				userConnections.map((connection) =>
					getConnectionEntity(connection)
				)
			);
		}
	};

	return (
		<div className="connection__container profile">
			{getHeader() }
			<div className="u-p-v-s u-tqw">
				<Search prefix={ searchPrefix } setPrefix={ setSearchPrefix } />
			</div>
			{getConnections() }
		</div>
	);
};

export default ConnectionsScreen;
