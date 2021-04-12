import Avatar from '../Avatar/Avatar';
import logo from '../../assets/Logos/company_logo.png';
import { getUser } from '../../helpers/session';

const LeftNavHeader = () => {
	return (
		<div className="header">
			<Avatar src={ logo } extraStyle="u-c-pointer" alt="company logo" />
			{
				getUser() ?
					<Avatar src={ getUser().image } extraStyle="u-c-pointer" alt="profile logo" />
					: null
			}
			<h1>Icon2</h1>
			<h1>Icon3</h1>
		</div>
	);
};

export default LeftNavHeader;
