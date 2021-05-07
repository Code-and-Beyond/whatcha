import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getUser } from '../../helpers/session';
import { fetchSavedPosts } from '../../store/actions/index';

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

import FillButton from '../../components/Button/Fill';
const marked = require("marked");



const Post = (props) => {
	const {
		postId,
		content,
		attachment,
		upvotesCount,
		commentsCount,
		createdAt,
		name,
		email,
		displayPicture,
		upvoteState,
		saved
	} = props;

	const dispatch = useDispatch();
	const [upvote, setUpvote] = useState(upvoteState);
	const [upvoteCount, setUpvoteCount] = useState(upvotesCount);
	const [openComments, setOpenComments] = useState(false);
	const [newComment, setNewComment] = useState('');
	const [, setSharePopup] = useState(false);
	const [showPopover, setShowPopover] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentsCounter, setCommentsCounter] = useState(commentsCount);

	const daysCount = moment(new Date(createdAt)).fromNow();

	const handleToggleUpvote = () => {
		setUpvote(!upvote);
		if (!upvote) {
			setUpvoteCount(upvoteCount + 1);
			axios({
				url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/` + postId,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// 'Authorization': 'Bearer ' + getAccessToken()
				},
				data: {
					upvotes: upvoteCount + 1,
				},
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
					}
				})
				.catch((err) => console.log(err));

			axios({
				url:
					`${process.env.REACT_APP_ENDPOINT}/api/pub/users/upvote/` +
					getUser().id +
					'/' +
					postId,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
					}
				})
				.catch((err) => console.log(err));
		} else {
			setUpvoteCount(upvoteCount - 1);
			axios({
				url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/` + postId,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					// 'Authorization': 'Bearer ' + getAccessToken()
				},
				data: {
					upvotes: upvoteCount - 1,
				},
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
					}
				})
				.catch((err) => console.log(err));

			axios({
				url:
					`${process.env.REACT_APP_ENDPOINT}/api/pub/users/upvote/` +
					getUser().id +
					'/' +
					postId,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const savePost = () => {
		const uid = getUser().id;
		const pid = postId;
		setShowPopover(false);
		axios({
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/save`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				uid,
				pid
			}
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
					dispatch(fetchSavedPosts(uid));
				}
			})
			.catch((err) => console.log(err));
	};


	const UnSavePost = () => {
		const uid = getUser().id;
		const pid = postId;
		setShowPopover(false);
		axios({
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/save`,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				uid,
				pid
			}
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
					dispatch(fetchSavedPosts(uid));
				}
			})
			.catch((err) => console.log(err));
	};

	const getEditOptions = () => (
		getUser().username === email &&
		<React.Fragment>
			<p className="b b--3" onClick={ () => { props.handleEditPost(postId, content); setShowPopover(false); } }>Edit</p>
			<p className="b b--3" onClick={ () => { props.handleDeletePost(postId); setShowPopover(false); } } >Delete</p>
		</React.Fragment>
	);

	const getHeader = () => {
		return (
			<React.Fragment>
				<Avatar src={ displayPicture } alt="avatar" size="7rem" />
				<div className="post__head--data">
					<h3 className="a a--1 a--name">{ name }</h3>
					<h4 className="b b--3 h--disabled">{ email }</h4>
					<h4 className="b c--3 h--disabled">{ daysCount }</h4>
				</div>
				<div
					className="post__head--dotsContainer u-c-pointer"
					onClick={ () => setShowPopover(!showPopover) }
				>
					<img
						src={ dots }
						alt="three dots"
						className="post__head--dots u-c-pointer"
					/>
				</div>
				<div className="menu">
					{ showPopover ?
						<React.Fragment>
							{ saved ?
								<p className="b b--3" onClick={ UnSavePost }>Unsave</p> :
								<p className="b b--3" onClick={ savePost }>Save</p>
							}
							{ getEditOptions() }
						</React.Fragment>
						: null
					}
				</div>
			</React.Fragment>
		);
	};

	const getContent = () => {
		return (
			<React.Fragment>
				<p className="a a--2 text--black u-p-v-m"
					dangerouslySetInnerHTML={ {
						__html: marked(content),
					} }
				/>
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

	const fetchComments = async (gotNewComment, deletedComment) => {
		if (!openComments || gotNewComment || deletedComment) {
			try {
				const res = await axios({
					method: 'GET',
					url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/${postId}/comments`,
				});
				if (res.status === 200 && !res.data.error) {
					const data = res.data.data;
					setComments(data);
					console.log(data);
				}
			} catch (err) {
				console.log(err);
			}
			setOpenComments(true);
		} else {
			setOpenComments(false);
		}
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
						<h3 className="a a--2 a--name text--black">
							Upvote{ !upvote ? '' : 'd' }
						</h3>
					</span>
					<span onClick={ () => fetchComments(false) }>
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
					{ upvoteCount } upvote{ upvoteCount !== 1 ? 's' : '' } -{ ' ' }
					{ commentsCounter } comment{ commentsCounter !== 1 ? 's' : '' }
				</div>
			</React.Fragment>
		);
	};

	const postComment = () => {
		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/${postId}/comments`,
			data: {
				uid: getUser().id,
				text: newComment,
			},
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
					fetchComments(true);
					axios({
						method: 'PUT',
						url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/${postId}`,
						data: {
							comments: commentsCounter + 1,
						},
					})
						.then((res) => {
							if (res.status === 200 && !res.data.error) {
								const data = res.data.message;
								setCommentsCounter(commentsCounter + 1);
								console.log(data);
							}
						})
						.catch((err) => console.log(err));
				}
			})
			.catch((err) => console.log(err));

		setNewComment('');
	};

	const deleteComment = (commentId) => {
		axios({
			method: 'DELETE',
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}`,
		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				console.log(res.data.message);
				fetchComments(false, true);
				axios({
					method: 'PUT',
					url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/${postId}`,
					data: {
						comments: commentsCounter - 1,
					},
				})
					.then((res) => {
						if (res.status === 200 && !res.data.error) {
							const data = res.data.message;
							setCommentsCounter(commentsCounter - 1);
							console.log(data);
						}
					})
					.catch((err) => console.log(err));
			}
		});
	};

	const showComments = () => {
		return (
			<div>
				<Row ai="c" extraStyle="u-m-t-s">
					<Avatar
						src={ getUser() ? getUser().image : user }
						alt="avatar"
						size="4.5rem"
					/>
					<Input
						value={ newComment }
						handleInput={ (val) => setNewComment(val) }
						placeholder="Add a comment"
						extraStyle="post__input u-m-l-xs"
					/>
					{ getUser() && newComment !== '' ? (
						<FillButton
							extraStyle="u-m-l-xs u-p-h-m a--2 post__input--btn"
							text="Post"
							type={ 1 }
							onClickHandler={ () => postComment() }
						/>
					) : null }
				</Row>
				{comments &&
					comments.map((comment) => (
						<Comment
							key={ comment.commentId }
							commentId={ comment.commentId }
							name={ comment.fullname }
							image={ comment.image }
							bio={ comment.bio }
							time={ comment.createdAt }
							text={ comment.text }
							uid={ comment.uid }
							likesCount={ comment.likesCount }
							handleDelete={ deleteComment }
						/>
					)) }
			</div>
		);
	};

	const getComments = () => (openComments ? showComments() : null);

	return (
		<div className="post">
			<div className="post__head">{ getHeader() }</div>
			{getContent() }
			<div className="post__icons">{ getIcons() }</div>
			{getComments() }
		</div>
	);
};

export default Post;
