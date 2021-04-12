
import { getUser } from '../../helpers/session';
import { useState, useEffect } from 'react';
import FillButton from '../Button/Fill';

import location from '../../assets/icons/location.svg';
import organization from '../../assets/icons/org.svg';
import link from '../../assets/icons/link.svg';
import Spinner from '../Spinner/Spinner';
import EditProfile from './EditProfile';
import axios from 'axios';

const Profile = () => {
	const loading = getUser() ? false : true;
	const [editProfile, setEditProfile] = useState(false);
	const [profileLoading, setProfileLoading] = useState(false);
	const [profileInfo, setProfileInfo] = useState([]);

	const fetchProfile = () => {
		setProfileLoading(true);
		axios({
			url: 'http://localhost:8080/api/pub/users/profile/' + getUser().id,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				// 'Authorization': 'Bearer ' + getAccessToken()
			}
		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				setProfileInfo(res.data.data[0]);
				setProfileLoading(false);
			}
		}).catch((err) => console.log(err));
	};

	useEffect(() => {
		if (!loading) {
			fetchProfile();
		}
	}, [loading]);

	return (
		!editProfile ?
			(<div className="profile">
				{ loading ?
					<Spinner loading={ loading } /> :
					<div className="profile__tray">
						<img
							src={ getUser().image }
							className="profile--avatar"
							alt="profile avatar"
						/>
						<div className="profile__details">

							<h1 className="h h--2">{ getUser().fullname } </h1>
							<h2 className="a a--1 h--disabled">{ getUser().username }</h2>

							{
								!profileLoading ?
									<>
										<h2 className="a a--1 u-p-t-s">
											{ profileInfo.bio }

										</h2>
										<FillButton text="Edit Profile" extraStyle="u-m-v-m" onClickHandler={ () => setEditProfile(true) } />
										<div className="d--f ai--c u-m-b-s">
											<img
												src={ location }
												className="u--icon"
												alt="location"
											/>
											<p className="b b--3 u-m-l-xs">{ profileInfo.location }</p>
										</div>
										<div className="d--f ai--c u-m-b-s">
											<img
												src={ organization }
												className="u--icon"
												alt="location"
											/>
											<p className="b b--3 u-m-l-xs">{ profileInfo.organization }</p>
										</div>
										<div className="d--f ai--c">
											<img
												src={ link }
												className="u--icon"
												alt="location"
											/>
											<a href={ profileInfo.website } className="text--link b b--3 u-m-l-xs">{ profileInfo.website }</a>
										</div>
									</>
									: null }
						</div>
					</div> }
			</div>)
			: (<EditProfile closeEdit={ () => setEditProfile(false) } fetchProfile={ fetchProfile } { ...profileInfo } />)
	);
};

export default Profile;
