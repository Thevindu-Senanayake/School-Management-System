import axios from "axios";
import {
	GET_OLD_MESSAGES_REQUEST,
	GET_OLD_MESSAGES_SUCCESS,
	GET_OLD_MESSAGES_FAIL,
	SEND_MESSAGES_REQUEST,
	SEND_MESSAGES_SUCCESS,
	SEND_MESSAGES_FAIL,
} from "../constants/messageConstants";

export const getOldMessages = (to, from) => async (dispatch) => {
	try {
		dispatch({ type: GET_OLD_MESSAGES_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/msg/getmsg",
			{ from: from, to: to },
			config
		);

		dispatch({
			type: GET_OLD_MESSAGES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_OLD_MESSAGES_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const sendMessages = (to, from, message, time) => async (dispatch) => {
	try {
		dispatch({ type: SEND_MESSAGES_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/v1/msg/addmsg",
			{ from: from, to: to, message: message, time: time },
			config
		);

		dispatch({
			type: SEND_MESSAGES_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: SEND_MESSAGES_FAIL,
			payload: error.response.data.message,
		});
	}
};
