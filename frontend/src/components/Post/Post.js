import React, { useState } from 'react';
import moment from 'moment';
import { getUser } from '../../helpers/session';

import Avatar from '../Avatar/Avatar';
import Input from '../Input/Input';
import Row from '../Row/Row';
import Comment from '../Comment/Comment';

import upVote from '../../assets/icons/upvote.svg';
import upVoteActive from '../../assets/icons/upvote-active.svg';
import upVotesDone from '../../assets/icons/upvotes-done.svg';
import user from '../../assets/profile/user.svg';
import dots from '../../assets/icons/dots.svg';
import share from '../../assets/icons/share.svg';
import comment from '../../assets/icons/comment.svg';
import axios from 'axios';

const Post = (props) => {
	const { postId, content, attachment, upvotesCount, createdAt, name, email, displayPicture, upvoteState } = props;

	const [upvote, setUpvote] = useState(upvoteState);
	const [upvoteCount, setUpvoteCount] = useState(upvotesCount);
	const [openComments, setOpenComments] = useState(false);
	const [addComment, setAddComment] = useState('');
	const [, setSharePopup] = useState(false);
	const [showPopover, setShowPopover] = useState(false);



	const daysCount = moment(new Date(createdAt)).fromNow();

	const handleToggleUpvote = () => {
		setUpvote(!upvote);
		if (!upvote) {

			setUpvoteCount(upvoteCount + 1);
			axios({
				url: 'http://localhost:8080/api/pub/post/' + postId,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// 'Authorization': 'Bearer ' + getAccessToken()
				},
				data: {
					upvotes: upvoteCount + 1
				}
			}).then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
				}
			}).catch((err) => console.log(err));

			axios({
				url: 'http://localhost:8080/api/pub/users/upvote/' + getUser().id + '/' + postId,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}).then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
				}
			}).catch((err) => console.log(err));

		} else {

			setUpvoteCount(upvoteCount - 1);
			axios({
				url: 'http://localhost:8080/api/pub/post/' + postId,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// 'Authorization': 'Bearer ' + getAccessToken()
				},
				data: {
					upvotes: upvoteCount - 1
				}
			}).then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
				}
			}).catch((err) => console.log(err));

			axios({
				url: 'http://localhost:8080/api/pub/users/upvote/' + getUser().id + '/' + postId,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}).then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
				}
			}).catch((err) => console.log(err));
		}
	};


	const getHeader = () => {
		return (
			<React.Fragment>
				<Avatar src={ displayPicture } alt="avatar" size="7rem" />
				<div className="post__head--data">
					<h3 className="a a--1 a--name">{ name }</h3>
					<h4 className="b b--3 h--disabled">{ email }</h4>
					<h4 className="b c--3 h--disabled">{ daysCount }</h4>
				</div>
				<div className="post__head--dotsContainer u-c-pointer" onClick={ () => setShowPopover(!showPopover) }>
					<img
						src={ dots }
						alt="three dots"
						className="post__head--dots u-c-pointer"
					/>
				</div>
				{ showPopover && getUser().username === email ?
					<div className='menu'>
						<p className='b b--3' onClick={ () => { props.handleEditPost(postId, content); setShowPopover(false); } }>Edit</p>
						<p className='b b--3' onClick={ () => { props.handleDeletePost(postId); setShowPopover(false); } }>Delete</p>
					</div>
					: null
				}
			</React.Fragment>
		);
	};

	const getContent = () => {
		return (
			<React.Fragment>
				<p className="a a--2 text--black u-p-v-m">
					{ content }
				</p>
				{attachment ? (
					<div className="post__imgContainer">
						<img
							src={ attachment }
							className="post__imgContainer--image"
							alt="post attachment"
						/>
					</div>
				) : null }
			</React.Fragment>
		);
	};

	const getIcons = () => {
		return (
			<React.Fragment>
				<div className="post__icons--basic">
					<span onClick={ handleToggleUpvote }>
						{ !upvote ? (
							<img
								src={ upVote }
								className="post__icons--upvote"
								alt="upvote"
							/>
						) : (
							<img
								src={ upVoteActive }
								className="post__icons--upvote"
								alt="upvote"
							/>
						) }
						<h3 className="a a--2 a--name text--black">Upvote{ !upvote ? '' : 'd' }</h3>
					</span>
					<span onClick={ () => setOpenComments(!openComments) }>
						<img
							src={ comment }
							className="post__icons--share"
							alt="upvote"
						/>
						<h3 className="a a--2 a--name text--black">Comment</h3>
					</span>
					<span onClick={ () => setSharePopup(true) }>
						<img
							src={ share }
							className="post__icons--share"
							alt="upvote"
						/>
						<h3 className="a a--2 a--name text--black">Share</h3>
					</span>
				</div>
				<div className="b b--3 text--black d--f ai--c">
					<img
						src={ upVotesDone }
						className="post__icons--upvotesDone"
						alt="upvote"
					/>{ ' ' }
					{ upvoteCount } upvotes - 0 comments
                </div>
			</React.Fragment>
		);
	};

	const getComments = () => (
		openComments ? (
			<div>
				<Row ai="c" extraStyle="u-m-t-s">
					<Avatar src={ getUser() ? getUser().image : user } alt="avatar" size="4.5rem" />
					<Input
						value={ addComment }
						handleInput={ (val) => setAddComment(val) }
						placeholder="Add a comment"
						extraStyle="post__input u-m-l-xs"
					/>
				</Row>
				<Comment />
			</div>
		) : null
	);

	return (
		<div className="post">
			<div className="post__head">{ getHeader() }</div>
			{getContent() }
			<div className="post__icons">{ getIcons() }</div>
			{ getComments() }
		</div>
	);
};

export default Post;
