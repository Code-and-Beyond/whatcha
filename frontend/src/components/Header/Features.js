import Avatar from '../Avatar/Avatar';
import { getUser } from '../../helpers/session';
import { useDispatch } from 'react-redux';
import { showChats, showCreateBlogs, showConnections, showSavedPosts, showProfile, showFeed } from '../../store/actions/index';

import logo from '../../assets/Logos/company_logo.png';
import bookmark from '../../assets/icons/bookmark.svg';
import network from '../../assets/icons/network.svg';
import chat from '../../assets/icons/chat.svg';
import write from '../../assets/icons/pencil.svg';

const FeaturesHeader = () => {
	const dispatch = useDispatch();

	return (
		<div className="header">
			<Avatar src={ logo } extraStyle="u-c-pointer" alt="company logo" handleClick={ () => dispatch(showFeed()) } />
			{
				getUser() ?
					<Avatar src={ getUser().image } extraStyle="u-c-pointer" alt="profile logo" handleClick={ () => dispatch(showProfile()) } />
					: null
			}
			<Avatar src={ bookmark } bg noRad extraStyle="u-c-pointer" alt="Bookmark" size='3rem' handleClick={ () => dispatch(showSavedPosts()) } />
			<Avatar src={ network } noRad extraStyle="u-c-pointer" alt="Connections" size='5rem' handleClick={ () => dispatch(showConnections()) } />
			<div className='header__line' />
			<Avatar src={ chat } bg noRad extraStyle="u-c-pointer" alt="Chats logo" size='3.5rem' handleClick={ () => dispatch(showChats()) } />
			<Avatar src={ write } bg noRad extraStyle="u-c-pointer" alt="Create Blog" size='3.5rem' handleClick={ () => dispatch(showCreateBlogs()) } />
		</div>
	);
};

export default FeaturesHeader;
