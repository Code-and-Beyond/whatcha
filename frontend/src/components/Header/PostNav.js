import { useState } from 'react'
import Input from '../Input/Input'

const PostNavHeader = () => {
	const [text, setText] = useState('')
	return (
		<div className='posts__header'>
			<div className='d--f u-p-b-m'>
				<h3 className="h h--3">Trending</h3>
				<h3 className="h h--3 u-m-l-m">Feed</h3>
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