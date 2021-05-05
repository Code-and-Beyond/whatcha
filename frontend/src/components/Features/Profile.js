
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FillButton from '../Button/Fill';

import location from '../../assets/icons/location.svg';
import organization from '../../assets/icons/org.svg';
import link from '../../assets/icons/link.svg';
import Spinner from '../Spinner/Spinner';
import EditProfile from './EditProfile';
import { getUser } from '../../helpers/session';

const Profile = (props) => {
	const { profile } = props;
	const loading = useSelector(state => state.userState.loading);
	const [editProfile, setEditProfile] = useState(false);


	return (
		!editProfile ?
			(<div className="profile">
				{ loading ?
					<Spinner loading={ loading } /> :
					<div className="profile__tray">
						<img
							src={ profile.image }
							className="profile--avatar"
							alt="profile avatar"
						/>
						<div className="profile__details">

							<h1 className="h h--2">{ profile.fullname } </h1>
							<h2 className="a a--1 h--disabled">{ profile.username }</h2>
							{ profile.bio && <h2 className="a a--1 u-m-v-s">{ profile.bio }</h2> }
							{ profile.location &&
								<div className="d--f ai--c u-m-b-s">
									<img
										src={ location }
										className="u--icon"
										alt="location"
									/>
									<p className="b b--3 u-m-l-xs">{ profile.location }</p>
								</div>
							}
							{ profile.organization &&
								<div className="d--f ai--c u-m-b-s">
									<img
										src={ organization }
										className="u--icon"
										alt="location"
									/>
									<p className="b b--3 u-m-l-xs">{ profile.organization }</p>
								</div>
							}
							{ profile.website ?
								<div className="d--f ai--c">
									<img
										src={ link }
										className="u--icon"
										alt="location"
									/>
									<a href={ profile.website } className="text--link b b--3 u-m-l-xs">{ profile.website }</a>
								</div>
								: null
							}
							{ getUser().id === profile.id &&
								<FillButton text="Edit Profile" extraStyle='u-m-t-m' onClickHandler={ () => setEditProfile(true) } />
							}
						</div>
					</div> }
			</div >)
			: (<EditProfile closeEdit={ () => setEditProfile(false) } { ...profile } />)
	);
};

export default Profile;
