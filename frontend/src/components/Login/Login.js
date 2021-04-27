import axios from 'axios';
import GoogleLogin from 'react-google-login';

import { useDispatch, useSelector } from 'react-redux';

import { toggleLoading, toggleLoggedIn, toggleLoginModal } from '../../store/actions/index';

import { setAccessToken, setRefreshToken, setUser } from '../../helpers/session';

import IconContainer from '../Icon/Container';

import google from '../../assets/icons/logo-google.svg';

// import { setAlert } from '../../store/actions/snackbar'

const Login = (props) => {

	const dispatch = useDispatch();

	const modalState = useSelector(state => state.loginModalState);

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

	return (
		modalState.visible ?
			<div className="backdrop" style={ { background: 'grey' } }>
				<div className='join__container card'>
					<div className="join__container__row">
						<h1 className="join__head h h--head text--black">Whatcha</h1>
					</div>
					<div className='h h--4 text--black'>Welcome to whatcha! Please login to continue.</div>
					<div className='join__container--social'>
						<GoogleLogin
							clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
							cookiePolicy={ 'single_host_origin' }
							render={ renderprops =>
								<IconContainer src={ google } color='#4285F4' text='Google' alt='google logo' onClickHandler={ renderprops.onClick } />
							}
							onSuccess={ onSuccessHandler }
							onFailure={ onFailureHandler }
						/>
					</div>
				</div>
			</div>
			:
			<div />
	);
};

export default Login;
