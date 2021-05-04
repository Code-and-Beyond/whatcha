import * as actionTypes from './actionTypes';
import axios from 'axios';

export const postsLoading = (loading) => {
	return {
		type: actionTypes.POSTS_LOADING,
		loading
	};
};

export const showFeed = () => {
	return (dispatch) => {
		dispatch(fetchAllPosts());
		dispatch({
			type: actionTypes.SHOW_FEED
		});
	};
};


export const showTrending = () => {
	return (dispatch) => {
		dispatch(fetchTrendingPosts());
		dispatch({
			type: actionTypes.SHOW_TRENDING
		});
	};
};

export const showBlogs = () => {
	return (dispatch) => {
		dispatch(fetchBlogs());
		dispatch({
			type: actionTypes.SHOW_BLOGS
		});
	};
};


export const showSavedPosts = () => {
	return {
		type: actionTypes.SHOW_SAVED_POSTS,
	};
};

export const fetchAllPosts = () => {
	return (dispatch) => {
		dispatch(postsLoading(true));
		axios.get('http://localhost:8080/api/pub/posts')
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log('allPosts', res.data.data);
					dispatch(postsLoading(false));
					dispatch({
						type: actionTypes.FETCH_ALL_POSTS,
						posts: res.data.data
					});
				}
			})
			.catch((err) => {
				dispatch(postsLoading(false));
				console.log(err);
			});
	};
};

export const fetchTrendingPosts = () => {
	return (dispatch) => {
		dispatch(postsLoading(true));
		axios.get('http://localhost:8080/api/pub/posts/trending')
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log('trending', res.data.data);
					dispatch(postsLoading(false));
					dispatch({
						type: actionTypes.FETCH_TRENDING_POSTS,
						trendingPosts: res.data.data
					});
				}
			})
			.catch((err) => {
				dispatch(postsLoading(false));
				console.log(err);
			});
	};
};

export const fetchBlogs = () => {
	return (dispatch) => {
		dispatch(postsLoading(true));
		axios.get('http://localhost:8080/api/pub/blogs')
			.then((res) => {
				if (res.status === 200 && !res.data.error) {
					console.log('blogs', res.data.data);
					dispatch(postsLoading(false));
					dispatch({
						type: actionTypes.FETCH_BLOGS,
						blogs: res.data.data,
					});
				}
			})
			.catch((err) => {
				dispatch(postsLoading(false));
				console.log(err);
			});
	};
};