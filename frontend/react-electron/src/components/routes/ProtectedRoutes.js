import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/authActions";

import Loader from "../layout/Loader";

const ProtectedRoutes = ({ children, isAdmin }) => {
	const {
		isAuthenticated = false,
		loading = true,
		user,
	} = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!user || user === {}) {
			dispatch(loadUser());
		}
	}, [isAuthenticated, loading, user, dispatch]);

	if (loading) {
		return <Loader />;
	}

	if (!loading && isAuthenticated) {
		if (isAdmin === true && (user.role !== "admin" || user.role !== "god")) {
			return <Navigate to="/" />;
		}
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

export default ProtectedRoutes;
