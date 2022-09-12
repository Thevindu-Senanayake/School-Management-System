import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/Loader";
import { login, clearErrors } from "../../actions/authActions";

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
					<div className="loginWrapper">
						<form action="" className="form" onSubmit={submitHandler}>
							<img src="images/avatar.png" alt="avatar" />
							<h2>Login</h2>
							<div className="inputGroup">
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
							<div className="inputGroup">
								<input
									type="password"
									name="loginPassword"
									id="loginPassword"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<label htmlFor="loginPassword">Password</label>
								<button type="submit" className="submitBtn">
									Login
								</button>
							</div>
						</form>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Login;
