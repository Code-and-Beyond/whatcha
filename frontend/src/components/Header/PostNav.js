import { useState } from 'react'
import Input from '../Input/Input'

import TextButton from '../../components/Button/Text'

import Avatar from '../Icons/Avatar'
import avatar from '../../assets/profile/me.jpeg'

const PostNavHeader = () => {
	const [text, setText] = useState('')
	return (
		<div className='posts__header'>
			<div className='posts__header--top'>
				<Avatar src={ avatar } extraStyle='u-c-pointer' alt='user avatar' />
				<h3 className="h h--3 u-m-l-m">Feed</h3>
				<h3 className="h h--3 u-m-l-m">Trending</h3>
				<h3 className="h h--3 u-m-l-m">Blogs</h3>
				<TextButton extraStyle='u-m-l-auto' text='Logout' type={ 1 } />
			</div>
			<Input
				value={ text }
				handleInput={ (val) => setText(val) }
				placeholder='Start a post'
			/>
		</div>
	)
}

export default PostNavHeader