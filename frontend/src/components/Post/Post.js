import React, { useState } from "react"
import Avatar from "../Avatar/Avatar"
import Input from '../Input/Input'

import upVote from '../../assets/icons/upvote.svg'
import upVoteActive from '../../assets/icons/upvote-active.svg'
import upVotesDone from '../../assets/icons/upvotes-done.svg'
import ps from '../../assets/profile/prerna.jpg'
import post1 from '../../assets/posts/post1.jpeg'
import dots from '../../assets/icons/dots.svg'
import share from '../../assets/icons/share.svg'
import comment from '../../assets/icons/comment.svg'

const Post = () => {
	const [addComment, setAddComment] = useState('')
	const [upvote, setUpvote] = useState(false)
	const [openComments, setOpenComments] = useState(false)
	const [, setSharePopup] = useState(false)


	const getHeader = () => {
		return (
			<React.Fragment>
				<Avatar src={ ps } alt='avatar' size='7rem' />
				<div className='post__head--data'>
					<h3 className='a a--1 a--name'>Prerna Singh</h3>
					<h4 className='b b--3 h--disabled'>prernasingh1401</h4>
					<h4 className='b c--3 h--disabled'>4d</h4>
				</div>
				<div className='post__head--dotsContainer u-c-pointer'>
					<img src={ dots } alt='three dots' className='post__head--dots u-c-pointer' />
				</div>
			</React.Fragment>
		)
	}

	const getContent = () => {
		return (
			<React.Fragment>
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
			</React.Fragment>
		)
	}

	const getIcons = () => {
		return (
			<React.Fragment>
				<div className='post__icons--basic'>
					<span onClick={ () => setUpvote(!upvote) }>
						{ upvote ?
							<img src={ upVote } className='post__icons--upvote' alt='upvote' /> : <img src={ upVoteActive } className='post__icons--upvote' alt='upvote' />
						}
						<h3 className='a a--2 a--name text--black'>Upvote</h3>
					</span>
					<span onClick={ () => setOpenComments(!openComments) }>
						<img src={ comment } className='post__icons--share' alt='upvote' />
						<h3 className='a a--2 a--name text--black'>Comment</h3>
					</span>
					<span onClick={ () => setSharePopup(true) }>
						<img src={ share } className='post__icons--share' alt='upvote' />
						<h3 className='a a--2 a--name text--black'>Share</h3>
					</span>
				</div>
				<div className='b b--3 text--black d--f ai--c'>
					<img src={ upVotesDone } className='post__icons--upvotesDone' alt='upvote' /> 2 upvotes - 2 comments
				</div>
			</React.Fragment>
		)
	}

	return (
		<div className='post'>
			<div className='post__head'>
				{ getHeader() }
			</div>
			{getContent() }
			<div className='post__icons'>
				{ getIcons() }
			</div>
			{openComments ?
				<Input
					value={ addComment }
					handleInput={ (val) => setAddComment(val) }
					placeholder='Add a comment'
					extraStyle='post__input'
				/>
				: null
			}
		</div>
	)
}

export default Post
