import axios from "axios";
import {
	MARK_ATTENDANCE_REQUEST,
	MARK_ATTENDANCE_SUCCESS,
	MARK_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

// Update User Details (Admin)
export const markAttendance = (userData) => async (dispatch) => {
	try {
		dispatch({ type: MARK_ATTENDANCE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/attendance/mark",
			userData,
			config
		);

		dispatch({
			type: MARK_ATTENDANCE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: MARK_ATTENDANCE_FAIL,
			payload: error.response.data.message,
		});
	}
};
