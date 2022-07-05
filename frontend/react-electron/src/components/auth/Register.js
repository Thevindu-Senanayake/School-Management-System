import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/authActions";

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
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow-lg"
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<h1 className="mb-3">Register</h1>

						<div className="form-group">
							<label htmlFor="name_field">User Name</label>
							<input
								type="name"
								id="name_field"
								className="form-control"
								name="userName"
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
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							id="register_button"
							type="submit"
							className="btn btn-block py-3"
							disabled={loading ? true : false}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
