import Avatar from '../Avatar/Avatar';
import { getUser } from '../../helpers/session';
import { useDispatch } from 'react-redux';
import { showChats } from '../../store/actions/index';
import logo from '../../assets/Logos/company_logo.png';
import chat from '../../assets/icons/chat.svg';

const FeaturesHeader = () => {
	const dispatch = useDispatch();

	return (
		<div className="header">
			<Avatar src={ logo } extraStyle="u-c-pointer" alt="company logo" />
			{
				getUser() ?
					<Avatar src={ getUser().image } extraStyle="u-c-pointer" alt="profile logo" />
					: null
			}
			<Avatar src={ chat } bg noRad extraStyle="u-c-pointer" alt="Chats logo" size='3.5rem' handleClick={ () => dispatch(showChats()) } />
			<h1>Icon2</h1>
			<h1>Icon3</h1>
		</div>
	);
};

export default FeaturesHeader;
