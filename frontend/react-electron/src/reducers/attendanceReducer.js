import {
	MARK_ATTENDANCE_REQUEST,
	MARK_ATTENDANCE_SUCCESS,
	MARK_ATTENDANCE_FAIL,
	MARK_ATTENDANCE_RESET,
	VIEW_ATTENDANCE_REQUEST,
	VIEW_ATTENDANCE_SUCCESS,
	VIEW_ATTENDANCE_FAIL,
	ADMIN_ATTENDANCE_REQUEST,
	ADMIN_ATTENDANCE_SUCCESS,
	ADMIN_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

export const markAttendaceReducer = (state = {}, action) => {
	switch (action.type) {
		case MARK_ATTENDANCE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case MARK_ATTENDANCE_SUCCESS:
			return {
				...state,
				loading: false,
				isMarked: action.payload,
			};

		case MARK_ATTENDANCE_RESET:
			return {
				...state,
				isMarked: false,
			};

		case MARK_ATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const viewAttendaceReducer = (state = {}, action) => {
	switch (action.type) {
		case VIEW_ATTENDANCE_REQUEST:
		case ADMIN_ATTENDANCE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case VIEW_ATTENDANCE_SUCCESS:
		case ADMIN_ATTENDANCE_SUCCESS:
			return {
				...state,
				loading: false,
				attendance: action.payload,
			};

		case VIEW_ATTENDANCE_FAIL:
		case ADMIN_ATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
