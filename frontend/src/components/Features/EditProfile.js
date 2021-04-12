import { useState } from 'react';

import Input from '../Input/Input';
import FillButton from '../Button/Fill';
import Row from '../Row/Row';
import axios from 'axios';

import gobackIcon from '../../assets/icons/goback.svg';
import { getUser } from '../../helpers/session';

const EditProfile = (props) => {

	const { website, bio, location, organization } = props;

	const [bioData, setBioData] = useState(bio);
	const [link, setLink] = useState(website);
	const [currLocation, setCurrLocation] = useState(location);
	const [org, setOrg] = useState(organization);
	const [update, setUpdate] = useState(false);

	const handleProfileUpdate = () => {
		props.closeEdit(false);
		setUpdate(true);
		axios({
			url: "http://localhost:8080/api/pub/users/profile/" + getUser().id,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				// 'Authorization': 'Bearer ' + getAccessToken()
			},
			data: {
				bio: bioData,
				location: currLocation,
				organization: org,
				website: link
			},

		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				setUpdate(false);
				props.fetchProfile();
				console.log(res.data);
			}
		}).catch((err) => console.log(err));
	};

	return (
		<div className='editProfile'>
			<div className='u-p-h-s u-p-v-s'>
				<Row ai='c' jc='sb' extraStyle='u-m-v-s'>
					<div className="d--f ai--c">
						<img
							src={ gobackIcon }
							className="editProfile--icon u--icon"
							alt="location"
							onClick={ props.closeEdit }
						/>
						{ update ?
							<h1 className='h h--2'>updating...</h1>
							:
							<h1 className='h h--2'>Hi there! Ramji</h1>
						}

					</div>
					<FillButton
						extraStyle='text--black'
						text="Update"
						type={ 2 }
						onClickHandler={ handleProfileUpdate }
					/>
				</Row>
				<div className='blogs u-m-t-m'>
					<Input
						extraStyle='blogs__input h h--5'
						value={ bioData }
						handleInput={ (val) => setBioData(val) }
						placeholder="Something about you..."
					/>
					<Input
						extraStyle='blogs__input h h--5'
						value={ org }
						handleInput={ (val) => setOrg(val) }
						placeholder="Your organization(s)"
					/>
					<Input
						extraStyle='blogs__input h h--5'
						value={ currLocation }
						handleInput={ (val) => setCurrLocation(val) }
						placeholder="Your location"
					/>
					<Input
						extraStyle='blogs__input h h--5'
						value={ link }
						handleInput={ (val) => setLink(val) }
						placeholder="Your website/social media link"
					/>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
