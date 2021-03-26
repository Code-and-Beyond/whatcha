import FillButton from '../Button/Fill'

import me from '../../assets/profile/me.jpeg'
import location from '../../assets/icons/location.svg'

const Profile = () => {
	return (
		<div className='profile'>
			<div className='profile__tray'>
				<img src={ me } className="profile--avatar" alt='profile avatar' />
				<div className='profile__details'>
					<h1 className='h h--2'>Ramji Rathore</h1>
					<h2 className='a a--1 h--disabled'>ramjirathore</h2>
					<h2 className='a a--1 u-p-t-s'>React Developer | UI designer | Graphic Designer | DSA Enthusiast | React | Redux | SaSS | Material-UI</h2>
					<FillButton text='Edit Profile' extraStyle='u-m-v-m' />
					<div className='d--f ai--c'>
						<img src={ location } className='icon' alt='location' />
						<p className='b b--3 u-m-l-xs'>Noida, India</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
