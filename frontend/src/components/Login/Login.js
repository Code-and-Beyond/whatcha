import React from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login'

import { toggleLoginModal } from '../../store/actions/loginModal'
import { toggleLoading } from '../../store/actions/loading'
import { toggleLoggedIn } from '../../store/actions/user'

import { setAccessToken, setRefreshToken, setUser } from '../../helpers/session'

import IconContainer from '../Icon/Container'

// import facebook from '../../assets/icons/logo-facebook.svg';
import google from '../../assets/icons/logo-google.svg'

import closeIcon from '../../assets/icons/ico-close.svg'
import Icon from '../Icon/Icon'
// import { setAlert } from '../../store/actions/snackbar'

const Login = (props) => {

	const dispatch = useDispatch()

	const modalState = useSelector(state => state.loginModalState)

	const onSuccessHandler = response => {
		dispatch(toggleLoginModal(false))
		dispatch(toggleLoading(true, "default", "Loggin In..."))
		axios({
			url: 'https://34.123.64.49:443/auth/google',
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
					const data = res.data.data
					const acsTkn = res.data.tokens.accessToken
					const rfsTkn = res.data.tokens.refreshToken
					setUser(data)
					setAccessToken(acsTkn)
					setRefreshToken(rfsTkn)
					dispatch(toggleLoading(false))
					dispatch(toggleLoggedIn(true))
				}
				else {
					dispatch(toggleLoading(false))
					// dispatch(setAlert(-1, "Something went wrong", true))
				}
			})
			.catch(err => {
				dispatch(toggleLoading(false))
				// dispatch(setAlert(-1, "Something went wrong", true))
			})
	}
	const onFailureHandler = res => { console.log({ failure: res }) /*dispatch(setAlert(-1, "Something went wrong", true))*/ }

	// const responseFacebook = (response) => {
	// 	console.log({response})
	// 	axios({
	// 		url: 'https://34.123.64.49:443/auth/facebook',
	// 		method: 'post',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Access-Control-Allow-Origin': '*'
	// 		},
	// 		data: {
	// 			'token': response.accessToken,
	// 			'user': {
	// 				'email': response.email,
	// 				'id': response.id,
	// 				'name': response.name,
	// 				'image': response.picture.data.url,
	// 				'fname': response.name.split(' ')[0],
	// 				'lname': response.name.split(' ')[response.name.split(' ').length - 1]
	// 			}
	// 		}
	// 	})
	// 		.then(res => { console.log({ res }); })
	// 		.catch(err => console.log({ err }));
	// };

	return (
		modalState.visible ?
			<div className="backdrop">
				<div className='join__container card'>
					<div className="join__container__row">
						<h1 className="join__head h h--head">WePrep</h1>
						<Icon src={ closeIcon } onClickHandler={ () => { dispatch(toggleLoginModal(false)) } } extraStyle="icon--s" />
					</div>
					<div className='h h--3'>Join now to unlock your complete potential and ace all the exams.</div>
					<div className='join__container--social'>
						<GoogleLogin clientId="794549463220-752dfsj8mhgpgpjl4f44u2amuhipqtpc.apps.googleusercontent.com"
							render={ renderprops =>
								<IconContainer src={ google } color='#16C9FF' text='Google' alt='google logo' onClickHandler={ renderprops.onClick } />
							}
							onSuccess={ onSuccessHandler } onFailure={ onFailureHandler } />
						{/* <FacebookLogin appId="237479144687081"
							render={renderprops =>
								<IconContainer src={facebook} color='#1878F3' text='Facebook' alt='facebook logo' onClickHandler={renderprops.onClick()} />
							}
							callback={responseFacebook}
						/> */}
					</div>
				</div>
			</div>
			:
			<div />
	)
}

export default Login
