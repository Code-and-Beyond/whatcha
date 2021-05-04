import {
	FETCH_ALL_POSTS,
	FETCH_BLOGS,
	FETCH_TRENDING_POSTS,
	POSTS_LOADING,
	SHOW_BLOGS,
	SHOW_FEED,
	SHOW_TRENDING,
	SHOW_SAVED_POSTS
} from '../actions/actionTypes';

const initialState = {
	show: 'feed',
	posts: [],
	saved: [],
	blogs: [],
	trending: [],
	loading: false
};

const handlePosts = (state = initialState, action) => {
	switch (action.type) {
		case POSTS_LOADING:
			return {
				...state,
				loading: action.loading
			};
		case SHOW_FEED:
			return {
				...state,
				show: 'feed'
			};
		case SHOW_TRENDING:
			return {
				...state,
				show: 'trending'
			};
		case SHOW_BLOGS:
			return {
				...state,
				show: 'blogs'
			};
		case SHOW_SAVED_POSTS:
			return {
				...state,
				show: 'saved',
			};
		case FETCH_ALL_POSTS:
			return {
				...state,
				posts: [...action.posts]
			};
		case FETCH_TRENDING_POSTS:
			return {
				...state,
				trending: [...action.trendingPosts],
			};
		case FETCH_BLOGS:
			return {
				...state,
				blogs: [...action.blogs],
			};
		default:
			return state;
	}
};

export default handlePosts;