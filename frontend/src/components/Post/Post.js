import { useState } from "react"
import Avatar from "../Icons/Avatar"
import Input from '../Input/Input'

import ps from '../../assets/profile/prerna.jpg'
import post1 from '../../assets/posts/post1.jpeg'
import dots from '../../assets/icons/dots.svg'

const Post = () => {
	const [addComment, setAddComment] = useState('')
	return (
		<div className='post'>
			<div className='post__head'>
				<Avatar src={ ps } alt='avatar' size='7rem' />
				<div className='post__head--data'>
					<h3 className='a a--1 a--name'>Prerna Singh</h3>
					<h4 className='b b--3 h--disabled'>prernasingh1401</h4>
					<h4 className='b c--3 h--disabled'>4d</h4>
				</div>
				<div className='post__head--dotsContainer u-c-pointer'>
					<img src={ dots } alt='three dots' className='post__head--dots u-c-pointer' />
				</div>
			</div>

			<p className='a a--2 text--black u-p-t-m'>
				Ready for your next big step? For a limited time my course “Essential Coding Interview Course - Python Edition” is on SALE!

				It’s a tough time for all of us right now, and with the uncertainty with the job market it’s best to be prepared.

				This course is design your help you to be prepare with your next job interview, with specially chosen practical coding exercises.

				My goal is to help you to be prepared for your next coding interview and get you the best possible job offer you deserve!

				So why not join today and get ready for your next adventure!

				https://lnkd.in/eV2Ckji

				SHARE and TAG so that others can also learn.

				#softwareengineers #softwareengineering

				Follow Nathan Clarke, AMBCS RITTech
			</p>
			<div>
				<img src={ post1 } className='post__image' alt='post content' />
			</div>
			<Input
				value={ addComment }
				handleInput={ (val) => setAddComment(val) }
				placeholder='Add a comment'
				extraStyle='post__input'
			/>
		</div>
	)
}

export default Post
