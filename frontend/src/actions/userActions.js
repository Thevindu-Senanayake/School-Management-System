import axios from "axios";
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
	ADMIN_CONTACTS_REQUEST,
	ADMIN_CONTACTS_SUCCESS,
	ADMIN_CONTACTS_FAIL,
	ADMINS_REQUEST,
	ADMINS_SUCCESS,
	ADMINS_FAIL,
	CLEAR_ERRORS,
} from "../constants/userConstants";

// Get All Users (Admin)
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_USERS_REQUEST });

		const { data } = await axios.get("/api/v1/auth/admin/users");

		dispatch({
			type: ALL_USERS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		dispatch({
			type: ALL_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get Admin Contacts (Admin)
export const getAdminContacts = (userId) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_CONTACTS_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const userData = {
			userId: userId,
		};

		const { data } = await axios.post(
			"/api/v1/auth/admin/contacts",
			userData,
			config
		);

		dispatch({
			type: ADMIN_CONTACTS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_CONTACTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get Admins
export const getAdmins = () => async (dispatch) => {
	try {
		dispatch({ type: ADMINS_REQUEST });

		const { data } = await axios.get("/api/v1/auth/admins");

		dispatch({
			type: ADMINS_SUCCESS,
			payload: data.admins,
		});
	} catch (error) {
		dispatch({
			type: ADMINS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get User Details (Admin)
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/auth/admin/user/${id}`);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update User Details (Admin)
export const updateUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(
			`/api/v1/auth/admin/update-user`,
			userData,
			config
		);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: UPDATE_USER_FAIL,
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
