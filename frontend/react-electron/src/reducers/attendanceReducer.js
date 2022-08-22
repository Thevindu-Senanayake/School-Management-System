import {
	MARK_ATTENDANCE_REQUEST,
	MARK_ATTENDANCE_SUCCESS,
	MARK_ATTENDANCE_FAIL,
	MARK_ATTENDANCE_RESET,
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
