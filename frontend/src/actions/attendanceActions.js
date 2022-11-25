import axios from "axios";
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

// Mark attendance
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

// View attendace
export const viewAttendance = (className) => async (dispatch) => {
	try {
		dispatch({ type: VIEW_ATTENDANCE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const userData = {
			className: className,
		};

		const { data } = await axios.post(
			"/api/v1/attendance/old",
			userData,
			config
		);

		dispatch({
			type: VIEW_ATTENDANCE_SUCCESS,
			payload: data.attendance,
		});
	} catch (error) {
		dispatch({
			type: VIEW_ATTENDANCE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin attendance
export const adminAttendance = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_ATTENDANCE_REQUEST });

		let response = {};

		const { data } = await axios.get("api/v1/attendance/admin/");

		for (let i = 6; i < 10; i++) {
			const gradeName = `Grade ${i}`;
			response[gradeName] = [];
			data["attendance"].forEach((record) => {
				if (record["className"].indexOf(String(i)) > -1) {
					response[gradeName].push(record);
				}
			});
		}

		dispatch({
			type: ADMIN_ATTENDANCE_SUCCESS,
			payload: response,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_ATTENDANCE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Admin all attendance
export const viewAllAttendance = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_ALL_ATTENDANCE_REQUEST });

		let response = {};

		const { data } = await axios.get("api/v1/attendance/admin/all");

		for (let i = 6; i < 10; i++) {
			const gradeName = `Grade ${i}`;
			response[gradeName] = [];
			data["attendance"].forEach((record) => {
				if (record["className"].indexOf(String(i)) > -1) {
					response[gradeName].push(record);
				}
			});
		}

		dispatch({
			type: ADMIN_ALL_ATTENDANCE_SUCCESS,
			payload: response,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_ALL_ATTENDANCE_FAIL,
			payload: error.response.data.message,
		});
	}
};
