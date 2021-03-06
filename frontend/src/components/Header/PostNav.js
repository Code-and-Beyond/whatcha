import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../helpers/session';
import {
	toggleLoggedIn,
	showFeed,
	showTrending,
	showBlogs
} from '../../store/actions/index';
import FillButton from '../../components/Button/Fill';

import leftArrow from '../../assets/icons/left-arrow.svg';


const PostNavHeader = (props) => {
	const dispatch = useDispatch();
	const show = useSelector(state => state.postState.show);
	const savedSelected = useSelector(state => state.postState.show === 'saved');

	let classes = "h h--3 u-m-r-m";
	const colorGreen = '#56fe99';
	const colorWhite = '#ffffff';

	const handleLogout = () => {
		setLogout();
		setTimeout(() => {
			dispatch(toggleLoggedIn(false));
		}, 1000);
	};

	const handleShowFeed = () => {
		dispatch(showFeed());
		// dispatch(fetchAllPosts());
	};

	const handleShowTrending = () => {
		dispatch(showTrending());
		// dispatch(fetchTrendingPosts());

	};

	const handleShowBlogs = () => {
		dispatch(showBlogs());
		// dispatch(fetchBlogs());
	};

	const goBack = () => (
		<img
			src={ leftArrow }
			className="chat__header--icon u--icon"
			alt="go back"
			onClick={ () => dispatch(showFeed()) }
		/>
	);

	return (
		<div className="posts__header">
			<div className="posts__header--top">
				{ savedSelected ?
					<React.Fragment>
						{ goBack() }
						<h3 className={ classes } style={ { color: colorGreen } } >Saved Posts</h3>
					</React.Fragment>
					:
					<React.Fragment>
						<h3 className={ classes } onClick={ handleShowFeed } style={ { color: show === 'feed' ? colorGreen : colorWhite } }>Feed</h3>
						<h3 className={ classes } onClick={ handleShowTrending } style={ { color: show === 'trending' ? colorGreen : colorWhite } }>Trending</h3>
						<h3 className={ classes } onClick={ handleShowBlogs } style={ { color: show === 'blogs' ? colorGreen : colorWhite } }>Blogs</h3>
					</React.Fragment>
				}
				<FillButton extraStyle="u-m-l-auto a--2" text="Logout" type={ 1 } onClickHandler={ handleLogout } />
			</div>
			<div
				className="posts__header--start"
				onClick={ props.setShowPostModal }
			>
				<h1 className="h h--5 u-c-pointer">Start a Post</h1>
			</div>
		</div >
	);
};

export default PostNavHeader;
