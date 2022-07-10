import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/authActions";

import "../../css/auth.css";

const Register = () => {
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

		const formData = new FormData();
		formData.set("userName", userName);
		formData.set("password", password);

		dispatch(register(formData));
	};

	return (
		<Fragment>
			<div className="register">
				<form
					onSubmit={submitHandler}
					className="form"
					encType="multipart/form-data"
				>
					<Link to="/login" className="close">
						&times;
					</Link>
					<h2>Register</h2>
					<div className="input-group">
						<input
							type="name"
							id="registerUser"
							name="userName"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
						<label htmlFor="registerUser">User Name</label>
					</div>
					<div className="input-group">
						<input
							type="password"
							id="registerPassword"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor="registerPassword">Password</label>
					</div>
					<button
						type="submit"
						value="Submit"
						className="submit-btn"
						disabled={loading ? true : false}
					>
						Register
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Register;
