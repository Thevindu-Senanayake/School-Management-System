import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuthenticated, error, loading } = useSelector(
		(state) => state.auth
	);

	const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

	useEffect(() => {
		if (isAuthenticated) {
			navigate(redirect);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, isAuthenticated, alert, error, navigate, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(userName, password));
	};

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg" onSubmit={submitHandler}>
								<h1 className="mb-3">Login</h1>
								<div className="form-group">
									<label htmlFor="username_field">User Name</label>
									<input
										id="username_field"
										className="form-control"
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password_field">Password</label>
									<input
										type="password"
										id="password_field"
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								<Link
									to="/password/forgot"
									className="float-right mb-4"
								>
									Forgot Password?
								</Link>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
								>
									LOGIN
								</button>

								<Link to="/register" className="float-right mt-3">
									New User?
								</Link>
							</form>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
