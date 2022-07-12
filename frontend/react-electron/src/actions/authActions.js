import axios from "axios";
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS,
} from "../constants/authConstants";

// Login
export const login = (username, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/auth/login",
			{ userName: username, password },
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Register
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		};

		const { data } = await axios.post(
			"/api/v1/auth/register",
			userData,
			config
		);

		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Load user Details
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get("/api/v1/auth/me");

		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Logout
export const logOut = () => async (dispatch) => {
	try {
		await axios.get("/api/v1/auth/logout");

		dispatch({
			type: LOGOUT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
