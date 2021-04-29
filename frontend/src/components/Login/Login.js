import { useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading, toggleLoggedIn, toggleLoginModal } from '../../store/actions/index';
import { setAccessToken, setRefreshToken, setUser } from '../../helpers/session';

import IconContainer from '../Icon/Container';
import Input from '../Input/Input';

import google from '../../assets/icons/logo-google.svg';
import bg from '../../assets/backgrounds/community1.jpg';
// import { setAlert } from '../../store/actions/snackbar'

const Login = (props) => {
	const dispatch = useDispatch();
	const modalState = useSelector(state => state.loginModalState);

	const [signupData, setSignupData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		bio: ''
	});

	const onSuccessHandler = response => {
		dispatch(toggleLoginModal(false));
		dispatch(toggleLoading(true, "default", "Loggin In..."));
		axios({
			url: 'http://localhost:8080/auth/google',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			data: {
				'token': response.accessToken,
				'username': response.profileObj.email
			}
		})
			.then(res => {
				if (res.status === 200 && !res.data.error) {
					const data = res.data.data;
					const acsTkn = res.data.tokens.accessToken;
					const rfsTkn = res.data.tokens.refreshToken;
					setUser(data);
					setAccessToken(acsTkn);
					setRefreshToken(rfsTkn);
					dispatch(toggleLoading(false));
					dispatch(toggleLoggedIn(true));
				}
				else {
					// dispatch(toggleLoading(false));
					console.log("Couldn't login");
					// dispatch(setAlert(-1, "Something went wrong", true))
				}
			})
			.catch(err => {
				// dispatch(toggleLoading(false));
				console.log(err);
				// dispatch(setAlert(-1, "Something went wrong", true))
			});
	};

	const onFailureHandler = res => { console.log({ failure: res }); /*dispatch(setAlert(-1, "Something went wrong", true))*/ };


	const handleUserData = (type, val) => {
		setSignupData({ ...signupData, [type]: val });
	};


	return (
		modalState.visible ?
			<div className="join__back backdrop"
				style={ {
					backgroundImage: `url(${bg})`
				} }
			>
				<div className='join__container card' >
					<div className='join__container--head'>
						<h1 className="h h--head text--black">Whatcha</h1>
						<p className='b b--3 h--disabled text--black'>Enough of What are you doing? and more of just doing!</p>
					</div>

					<div className='join__login'>
						<h1 className='h h--3 u-p-v-m'>SignUp</h1>
						<Input placeholder='First Name' handleInput={ (val) => handleUserData('firstName', val) } />
						<Input placeholder='Last Name' handleInput={ (val) => handleUserData('lastName', val) } />
						<Input placeholder='Email Id' type='email' handleInput={ (val) => handleUserData('email', val) } />
						<Input placeholder='Password' type='password' handleInput={ (val) => handleUserData('password', val) } />
						<Input placeholder='Biography (optional)' type='password' handleInput={ (val) => handleUserData('bio', val) } />
						<p className='b b--2 text--black'>Already have an account? <span>SignIn</span></p>
					</div>

					{/* sign in with third party */ }
					<div className='join__thirdparty'>
						<div className='join__choice'>
							<p className='h h--4 text--black join__choice--or'>OR</p>
							<hr />
						</div>
						<div className='join__thirdparty--social'>
							<GoogleLogin
								clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
								cookiePolicy={ 'single_host_origin' }
								render={ renderprops =>
									<IconContainer src={ google } color='#4285F4' text='SignIn with Google' alt='google logo' onClickHandler={ renderprops.onClick } />
								}
								onSuccess={ onSuccessHandler }
								onFailure={ onFailureHandler }
							/>
						</div>
					</div>

				</div>
			</div>
			:
			<div />
	);
};

export default Login;
