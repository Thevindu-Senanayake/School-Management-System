import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logOut } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logOut());
		alert.success("Logged out successfully");
	};

	const chatHandler = () => {
		navigate("/chat");
	};

	return (
		<Fragment>
			<div>Home</div>
			<button onClick={logoutHandler}>logout</button>
			<button onClick={chatHandler}>Chat</button>
		</Fragment>
	);
};

export default Home;
