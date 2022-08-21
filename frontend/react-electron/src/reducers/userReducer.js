import {
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_RESET,
} from "../constants/userConstants";

export const updateUserReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case UPDATE_USER_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case UPDATE_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const allUsersReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};

		case ALL_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case ALL_USERS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};

		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
