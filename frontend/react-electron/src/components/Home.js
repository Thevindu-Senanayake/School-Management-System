import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { logOut } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logOut());
		alert.success("Logged out successfully");
	};
	return (
		<Fragment>
			<div>Home</div>
			<button onClick={logoutHandler}>logout</button>
		</Fragment>
	);
};

export default Home;
