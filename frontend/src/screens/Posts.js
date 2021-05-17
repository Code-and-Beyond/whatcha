import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getUser,
	getAccessToken,
	setAccessToken,
	setRefreshToken,
} from '../helpers/session';
import {
	showFeed,
	fetchAllPosts,
	fetchTrendingPosts,
	fetchSavedPosts
} from '../store/actions/index';

import Post from '../components/Post/Post';
import Modal from '../components/Modal/Modal';
import PostHeader from '../components/Header/PostNav';
import TextBox from '../components/TextBox/TextBox';
import FillButton from '../components/Button/Fill';
import Row from '../components/Row/Row';
import Icon from '../components/Icon/Icon';
import Spinner from '../components/Spinner/Spinner';
import Blog from '../components/Blog/Blog';

import imageIcon from '../assets/icons/ico-image.svg';
import trashIcon from '../assets/icons/ico-trash.svg';

const PostsScreen = () => {
	const dispatch = useDispatch();
	const currSelected = useSelector((state) => state.postState.show);
	const loadingSelected = useSelector((state) => state.postState.loading);
	const posts = useSelector((state) => state.postState.posts);
	const trendingPosts = useSelector((state) => state.postState.trending);
	const blogs = useSelector((state) => state.postState.blogs);
	const savedPosts = useSelector((state) => state.postState.saved);

	const initialAttachment = {
		raw: '',
		preview: '',
	};

	// POST DATA
	const [postContent, setPostContent] = useState('');
	const [attachment, setAttachment] = useState(initialAttachment);
	const [upvotedPosts, setUpvotedPosts] = useState([]);
	const [showPostModal, setShowPostModal] = useState(false);
	const [editPost, setEditPost] = useState({ show: false, id: null });
	const [uploadPost, setUploadPost] = useState(false);

	useEffect(() => {
		if (getUser()) {
			axios
				.get(
					`${process.env.REACT_APP_ENDPOINT}/api/pub/users/upvote/` + getUser().id
				)
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						dispatch(showFeed());
						dispatch(fetchSavedPosts(getUser().id));
						setUpvotedPosts(res.data.data);
					}
				})
				.catch((err) => console.log(err));
		}
	}, [dispatch]);

	const handlePostUpload = () => {
		setShowPostModal(false);
		// const totalPostData = {
		// 	postContent,
		// 	attachment,
		// };
		// setPosts([...posts, totalPostData]);
		setUploadPost(true);

		const reader = new FileReader();
		reader.readAsDataURL(attachment.raw);
		reader.onloadend = () => {
			axios({
				url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: 'Bearer ' + getAccessToken(),
				},
				data: {
					uid: getUser().id,
					content: postContent,
					encodedImg: reader.result,
				},
				maxContentLength: 10000000000,
				maxBodyLength: 100000000000,
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						setPostContent('');
						setAttachment(initialAttachment);
						setUploadPost(false);
						setAccessToken(res.data.tokens.access);
						setRefreshToken(res.data.tokens.refresh);
						dispatch(fetchAllPosts());
					}
				})
				.catch((err) => console.log(err));
		};
		reader.onerror = () => {
			console.log('Somehting went wrong!');
		};
	};

	const handleEditPostUpload = () => {
		setEditPost({ ...editPost, show: false });
		setShowPostModal(false);
		axios({
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/post/` + editPost.id,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				uid: getUser().id,
				content: postContent,
			},
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					setPostContent('');
					setAttachment(initialAttachment);
					setEditPost({ show: false, id: null });
					// console.log(res.data.data);
					dispatch(fetchAllPosts());
					dispatch(fetchTrendingPosts());
				}
			})
			.catch((err) => console.log(err));
	};

	const handleAttachmentChange = (e) => {
		if (e.target.files.length) {
			setAttachment({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};

	const handleEditPost = (postId, content) => {
		setEditPost({ show: true, id: postId });
		setPostContent(content);
		setShowPostModal(true);
	};

	const handleDeletePost = (postId) => {
		// const tempPosts = posts.filter((post) => post.pid !== postId);
		// setPosts(tempPosts);
		axios({
			url: `${process.env.REACT_APP_ENDPOINT}/api/pvt/post/` + postId,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + getAccessToken(),
			},
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log(res.data.message);
					setAccessToken(res.data.tokens.access);
					setRefreshToken(res.data.tokens.refresh);
					dispatch(fetchAllPosts());
					dispatch(fetchTrendingPosts());
				}
			})
			.catch((err) => console.log(err));
	};

	const getModal = () => (
		<Modal
			open={ showPostModal }
			title={ editPost.show ? 'Edit Post' : 'Create a Post' }
			handleClose={ () => setShowPostModal(false) }
			width="40vw"
			btnText="Post"
		>
			<TextBox
				rows={ 17 }
				value={ postContent }
				handleChange={ (val) => setPostContent(val) }
				placeholder="What do you want to talk about?"
			/>
			{attachment.preview ? (
				<div className="modal__previewContainer">
					<img
						src={ attachment.preview }
						className="modal__preview"
						alt="preview"
					/>
					<Icon
						src={ trashIcon }
						extraStyle="modal__preview--trashIcon u-c-pointer"
						alt="trash"
						size="m"
						onClickHandler={ () => setAttachment(initialAttachment) }
					/>
				</div>
			) : null }
			<Row jc="sb">
				<div className="d--f ai--c">
					<label htmlFor="upload-button">
						{
							<Icon
								src={ imageIcon }
								extraStyle="u-c-pointer"
								alt="Close"
								size="s"
							/>
						}
					</label>
					<input
						type="file"
						id="upload-button"
						style={ { display: 'none' } }
						onChange={ handleAttachmentChange }
					/>
					<br />
				</div>
				<FillButton
					extraStyle="modal__btn"
					text={ editPost.show ? 'Update' : 'Post' }
					disabled={ postContent === '' }
					type={ 1 }
					onClickHandler={
						editPost.show ? handleEditPostUpload : handlePostUpload
					}
				/>
			</Row>
		</Modal>
	);

	const getPostLoadingCard = () =>
		uploadPost ? (
			<div className="posts__loadingCard">
				<h1 className="h h--3 text--black"> Creating Post...</h1>
			</div>
		) : null;

	const checkForUpvote = (pid) => {
		for (const [, val] of upvotedPosts.entries()) {
			if (val.pid === pid) {
				return true;
			}
		}
		return false;
	};

	const checkForSaved = (pid) => {
		for (const [, val] of savedPosts.entries()) {
			if (val.pid === pid) {
				return true;
			}
		}
		return false;
	};

	const getAllPosts = () =>
		posts.length > 0 &&
		posts.map((post, index) => (
			<Post
				key={ post.pid }
				postId={ post.pid }
				content={ post.content }
				upvotesCount={ post.upvotes }
				commentsCount={ post.comments }
				attachment={ post.imgUrl }
				createdAt={ post.createdAt }
				name={ post.fullname }
				saved={ checkForSaved(post.pid) }
				email={ post.username }
				displayPicture={ post.image }
				upvoteState={ checkForUpvote(post.pid) }
				handleDeletePost={ handleDeletePost }
				handleEditPost={ handleEditPost }
			/>
		));

	const getTrendingPosts = () =>
		trendingPosts.length > 0 &&
		trendingPosts.map((post, index) => (
			<Post
				key={ post.pid }
				postId={ post.pid }
				content={ post.content }
				upvotesCount={ post.upvotes }
				commentsCount={ post.comments }
				attachment={ post.imgUrl }
				createdAt={ post.createdAt }
				name={ post.fullname }
				saved={ checkForSaved(post.pid) }
				email={ post.username }
				displayPicture={ post.image }
				upvoteState={ checkForUpvote(post.pid) }
				handleDeletePost={ handleDeletePost }
				handleEditPost={ handleEditPost }
			/>
		));

	const getAllBlogs = () =>
		blogs.length > 0 &&
		blogs.map((blog, index) => (
			<Blog
				key={ index }
				title={ blog.title }
				content={ blog.content }
				author={ blog.fullname }
				uploadedOn={ blog.createdAt.split('T')[0] }
			/>
		));


	const getSavedPosts = () =>
		savedPosts.length > 0 &&
		savedPosts.map((post, index) => (
			<Post
				key={ post.pid }
				postId={ post.pid }
				content={ post.content }
				upvotesCount={ post.upvotes }
				commentsCount={ post.comments }
				attachment={ post.imgUrl }
				createdAt={ post.createdAt }
				name={ post.fullname }
				saved={ checkForSaved(post.pid) }
				email={ post.username }
				displayPicture={ post.image }
				upvoteState={ checkForUpvote(post.pid) }
				handleDeletePost={ handleDeletePost }
				handleEditPost={ handleEditPost }
			/>
		));

	const getSpinner = () => (
		<div className="d--f jc--c u-p-v-b">
			<Spinner loading={ blogs.length === 0 } />
		</div>
	);

	const showSelected = () => {
		// console.log(currSelected);
		switch (currSelected) {
			case 'feed':
				return getAllPosts();
			case 'trending':
				return getTrendingPosts();
			case 'blogs':
				return getAllBlogs();
			case 'saved':
				return getSavedPosts();
			default:
				return getAllPosts();
		}
	};

	return (
		<div className="posts">
			<PostHeader setShowPostModal={ () => setShowPostModal(true) } />
			{getModal() }
			<div className="posts__container u-p-h-m">
				{ getPostLoadingCard() }
				{ loadingSelected ? getSpinner() : showSelected() }
			</div>
		</div>
	);
};

export default React.memo(PostsScreen);
