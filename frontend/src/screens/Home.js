import React from 'react'
import Header from '../components/Header/Header'
import Features from '../components/Features/Profile'
import Posts from './Posts'

const HomeScreen = () => {
	return (
		<div className='home'>
			<Header />
			<Features />
			<Posts />
		</div>
	)
}

export default HomeScreen
