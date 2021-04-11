
import { getUser } from '../../helpers/session';

import FillButton from '../Button/Fill';

import location from '../../assets/icons/location.svg';
import Spinner from '../Spinner/Spinner';
import React from 'react';

const Profile = () => {
	const loading = getUser() ? false : true;

	return (
		<div className="profile">
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
						<h2 className="a a--1 u-p-t-s">
							React Developer | UI designer | Graphic Designer | DSA
							Enthusiast | React | Redux | SaSS | Material-UI

							</h2>
						<FillButton text="Edit Profile" extraStyle="u-m-v-m" />
						<div className="d--f ai--c">
							<img
								src={ location }
								className="u--icon"
								alt="location"
							/>
							<p className="b b--3 u-m-l-xs">Noida, India</p>
						</div>
					</div>
				</div>
			}
		</div>
	);
};

export default Profile;
