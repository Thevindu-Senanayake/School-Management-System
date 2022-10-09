import {
	GET_OLD_MESSAGES_REQUEST,
	GET_OLD_MESSAGES_SUCCESS,
	GET_OLD_MESSAGES_FAIL,
	// RECEIVE_MESSAGES_REQUEST,
	// RECEIVE_MESSAGES_SUCCESS,
	// RECEIVE_MESSAGES_FAIL,
	SEND_MESSAGES_REQUEST,
	SEND_MESSAGES_SUCCESS,
	SEND_MESSAGES_FAIL,
	SEND_MESSAGES_RESET,
} from "../constants/messageConstants";

export const messagesReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_OLD_MESSAGES_REQUEST:
		case SEND_MESSAGES_REQUEST:
			return {
				...state,
				loading: true,
			};

		case GET_OLD_MESSAGES_SUCCESS:
			return {
				...state,
				loading: false,
				messages: action.payload,
			};

		case SEND_MESSAGES_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
			};

		case SEND_MESSAGES_RESET:
			return {
				...state,
				success: false,
			};

		case GET_OLD_MESSAGES_FAIL:
		case SEND_MESSAGES_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
