import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextButton from '../../components/Button/Text';
import { setLogout } from '../../helpers/session';
import { toggleLoggedIn } from '../../store/actions/index';

const PostNavHeader = (props) => {
	const dispatch = useDispatch();
	const showSavePosts = useSelector(state => state.featureState.show === 'saved');
	const [active, setActive] = useState('feed');

	let classes = "h h--3 u-m-r-m";

	const handleShowFeed = () => {
		setActive('feed');
		props.handleFeed();
		props.handleBlogs(false);
	};

	const handleShowTrending = () => {
		setActive('trending');
		props.handleTrending();
		props.handleBlogs(false);
	};

	const handleShowBlogs = () => {
		setActive('blogs');
		props.handleBlogs(true);
	};


	return (
		<div className="posts__header">
			<div className="posts__header--top">
				{ showSavePosts ?
					<h3 className={ classes } style={ { color: '#56fe99' } } >Saved Posts</h3>
					:
					<React.Fragment>
						<h3 className={ classes } onClick={ handleShowFeed } style={ { color: active === 'feed' ? '#56fe99' : 'white' } }>Feed</h3>
						<h3 className={ classes } onClick={ handleShowTrending } style={ { color: active === 'trending' ? '#56fe99' : 'white' } }>Trending</h3>
						<h3 className={ classes } onClick={ handleShowBlogs } style={ { color: active === 'blogs' ? '#56fe99' : 'white' } }>Blogs</h3>
					</React.Fragment>
				}
				<TextButton extraStyle="u-m-l-auto" text="Logout" type={ 1 } onClickHandler={ () => { dispatch(toggleLoggedIn(false)); setLogout(); } } />
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
