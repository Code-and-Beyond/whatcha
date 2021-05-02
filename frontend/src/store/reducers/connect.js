import {
	SHOW_CREATE_BLOGS,
	SHOW_CHATS,
	FETCH_CHATS_START,
	FETCH_CHATS_SUCCESS,
	FETCH_CHATS_FAILURE
} from "../actions/actionTypes";

const initialState = {
	loading: false,
	chatRooms: [],
	show: 'chats',
	message: ''
};

const handleToggle = (state = initialState, action) => {
	switch (action.type) {

		case FETCH_CHATS_START:
			return {
				...state,
				loading: true,
			};

		case FETCH_CHATS_SUCCESS:
			return {
				...state,
				chatRooms: action.rooms
			};

		case FETCH_CHATS_FAILURE:
			return {
				...state,
				loading: false,
				message: action.message
			};

		case SHOW_CHATS:
			return {
				...state,
				show: 'chats',
			};

		case SHOW_CREATE_BLOGS:
			return {
				...state,
				show: 'blogs',
			};

		default:
			return state;
	}
};

export default handleToggle;