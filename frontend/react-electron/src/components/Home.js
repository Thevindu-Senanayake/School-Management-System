import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

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

	const allUsersHandler = () => {
		navigate("/all-users");
	};

	return (
		<Fragment>
			<div>Home</div>
			<button onClick={logoutHandler}>logout</button>
			<button onClick={chatHandler}>Chat</button>
			<button onClick={allUsersHandler}>all users</button>
		</Fragment>
	);
};

export default Home;
