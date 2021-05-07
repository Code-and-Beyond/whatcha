import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getUser } from '../../helpers/session';

import Avatar from '../Avatar/Avatar';
import Row from '../Row/Row';
import Input from '../Input/Input';
import FillButton from '../Button/Fill';
import NoFillButton from '../Button/NoFIll';

import likeIcon from '../../assets/icons/like.svg';
import likedIcon from '../../assets/icons/liked.svg';
import dots from '../../assets/icons/dots.svg';

import axios from 'axios';

const Comment = (props) => {
	const {
		commentId,
		name,
		image,
		bio,
		time,
		text,
		likesCount,
		uid,
		handleDelete,
	} = props;
	const commentTime = moment(new Date(time)).fromNow();

	const [like, setLike] = useState(false);
	const [likesCounter, setLikesCounter] = useState(likesCount);
	const [showPopover, setShowPopover] = useState(false);
	const [edit, setEdit] = useState({ text: text, show: false });

	const checkForLike = (commentId) => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}/likes/${getUser().id
				}`,
		})
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					const data = res.data.data;
					if (data.length) setLike(true);
					else setLike(false);
					console.log(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		checkForLike(commentId);
		console.log('comment');
	}, [like, commentId]);

	const handleToogleLike = () => {
		if (!like) {
			setLike(true);
			setLikesCounter(likesCounter + 1);
			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}/likes`,
				data: {
					uid: getUser().id,
				},
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
						axios({
							method: 'PUT',
							url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}`,
							data: {
								likesCount: likesCounter + 1,
							},
						}).then((res) => {
							if (res.status === 200 && !res.data.error) {
								console.log(res.data.message);
							}
						});
					}
				})
				.catch((err) => console.log(err));
		} else {
			setLike(false);
			setLikesCounter(likesCounter - 1);
			axios({
				method: 'DELETE',
				url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}/likes/${getUser().id
					}`,
			})
				.then((res) => {
					if (res.status === 200 && !res.data.error) {
						console.log(res.data.message);
						axios({
							method: 'PUT',
							url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}`,
							data: {
								likesCount: likesCounter - 1,
							},
						}).then((res) => {
							if (res.status === 200 && !res.data.error) {
								console.log(res.data.message);
							}
						});
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const handleEdit = () => {
		console.log(edit.text);
		axios({
			method: 'PUT',
			url: `${process.env.REACT_APP_ENDPOINT}/api/pub/posts/comments/${commentId}`,
			data: {
				text: edit.text,
			},
		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				const data = res.data.message;
				console.log(data);
				setEdit({ ...edit, show: false });
			}
		}).catch(err => console.log(err));
	};

	const getCommentBody = () => (
		<div className="comment__container">
			<Row ai="c" jc="sb">
				<h2 className="b b--3 text--black">{ name }</h2>
				<div className="comment__dots">
					<p className="b b--4 text--black">{ commentTime }</p>
					<img
						src={ dots }
						alt="three dots"
						className="comment__dots--icon u-c-pointer"
						onClick={ () => setShowPopover(!showPopover) }
					/>
					{ showPopover && getUser().id === uid ? (
						<div className="menu comment__dots--popover">
							<p
								className="b b--4"
								onClick={ () => {
									setEdit({ ...edit, show: true });
									setShowPopover(false);
								} }
							>
								Edit
                            </p>
							<p
								className="b b--4"
								onClick={ () => handleDelete(commentId) }
							>
								Delete{ ' ' }
							</p>
						</div>
					) : null }
				</div>
			</Row>
			<p className="b b--4 text--black">{ bio }</p>
			{edit.show ? (
				<div>
					<Input
						extraStyle="comment__input h h--5"
						value={ edit.text }
						handleInput={ (val) => setEdit({ ...edit, text: val }) }
					/>
					<Row ai="jc">
						<FillButton
							extraStyle="a a--2 comment__input--btn"
							text="Save"
							type={ 1 }
							onClickHandler={ () => handleEdit() }
						/>
						<NoFillButton
							extraStyle="u-m-l-s a a--2 comment__input--btn"
							text="Cancel"
							onClickHandler={ () =>
								setEdit({ ...edit, show: false })
							}
						/>
					</Row>
				</div>
			) : (
				<p className="comment__body b b--3">{ edit.text }</p>
			) }
		</div>
	);

	return (
		<Row extraStyle="u-m-t-s" ai="fs">
			<Avatar src={ image } alt="user avatar" size="4.5rem" />
			<div className="comment">
				{ getCommentBody() }
				<div
					className="comment__container--likeContainer"
					onClick={ handleToogleLike }
				>
					{ like ? (
						<img
							src={ likedIcon }
							className="comment__container--like comment__container--liked"
							alt="liked icon"
						/>
					) : (
						<img
							src={ likeIcon }
							className="comment__container--like"
							alt="like icon"
						/>
					) }
					<p className="b b--4 text--black">
						{ likesCounter } like{ likesCounter !== 1 ? 's' : '' }
					</p>
				</div>
			</div>
		</Row>
	);
};

export default Comment;
