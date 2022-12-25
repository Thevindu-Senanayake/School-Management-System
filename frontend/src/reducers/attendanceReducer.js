import {
	MARK_ATTENDANCE_REQUEST,
	MARK_ATTENDANCE_SUCCESS,
	MARK_ATTENDANCE_FAIL,
	VIEW_ATTENDANCE_REQUEST,
	VIEW_ATTENDANCE_SUCCESS,
	VIEW_ATTENDANCE_FAIL,
	ADMIN_ATTENDANCE_REQUEST,
	ADMIN_ATTENDANCE_SUCCESS,
	ADMIN_ATTENDANCE_FAIL,
	ADMIN_ALL_ATTENDANCE_REQUEST,
	ADMIN_ALL_ATTENDANCE_SUCCESS,
	ADMIN_ALL_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

export const markAttendanceReducer = (state = {}, action) => {
	switch (action.type) {
		case MARK_ATTENDANCE_REQUEST:
			return {
				...state,
				loading: true,
				success: false,
			};

		case MARK_ATTENDANCE_SUCCESS:
			return {
				...state,
				success: false,
				loading: true,
			};

		case MARK_ATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.message,
				success: false,
				status: action.status,
			};

		default:
			return state;
	}
};

export const viewAttendanceReducer = (state = {}, action) => {
	switch (action.type) {
		case VIEW_ATTENDANCE_REQUEST:
		case ADMIN_ATTENDANCE_REQUEST:
		case ADMIN_ALL_ATTENDANCE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case VIEW_ATTENDANCE_SUCCESS:
		case ADMIN_ATTENDANCE_SUCCESS:
		case ADMIN_ALL_ATTENDANCE_SUCCESS:
			return {
				...state,
				loading: false,
				attendance: action.payload,
			};

		case VIEW_ATTENDANCE_FAIL:
		case ADMIN_ATTENDANCE_FAIL:
		case ADMIN_ALL_ATTENDANCE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
