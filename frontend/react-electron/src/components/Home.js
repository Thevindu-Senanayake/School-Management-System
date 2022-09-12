import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import { clearErrors } from "../actions/authActions";
import Loader from "./layout/Loader";

const Home = () => {
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();

	const { user, loading, error, isAuthenticated } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}

		if (!loading && (user.role === "admin" || user.role === "god")) {
			navigate("/admin/chat");
		}

		if (!loading && user.role === "user") {
			navigate("/chat");
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [loading, navigate, user.role, alert, dispatch, error, isAuthenticated]);

	return <Fragment>{loading && <Loader />}</Fragment>;
};

export default Home;
