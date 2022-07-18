import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";

import authStules from "../../css/auth.module.css";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, error, loading } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, isAuthenticated, alert, error, navigate]);

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
					<div className={authStules.loginWrapper}>
						<form
							action=""
							className={authStules.form}
							onSubmit={submitHandler}
						>
							<img src="images/avatar.png" alt="avatar" />
							<h2>Login</h2>
							<div className={authStules.inputGroup}>
								<input
									type="text"
									name="loginUser"
									id="loginUser"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									required
								/>
								<label htmlFor="loginUser">User Name</label>
							</div>
							<div className={authStules.inputGroup}>
								<input
									type="password"
									name="loginPassword"
									id="loginPassword"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<label htmlFor="loginPassword">Password</label>
								<button type="submit" className={authStules.submitBtn}>
									Login
								</button>
							</div>
							<br />
							<div className={authStules.links}>
								<Link
									to="/register"
									className={authStules.registerLink}
								>
									Create Account
								</Link>
							</div>
						</form>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
