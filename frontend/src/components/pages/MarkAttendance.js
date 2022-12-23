import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../layout/NavBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userActions";
import { markAttendance } from "../../actions/attendanceActions";

const MarkAttendance = () => {
	const [girls, setGirls] = useState(0);
	const [boys, setBoys] = useState(0);
	const [className, setClassName] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, loading, status, success } = useSelector(
		(state) => state.markAttendance
	);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user.role === "admin" || user.role === "god") {
			navigate("/admin/chat");
		}

		setClassName(user.userName);

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (status === 429) {
			alert.error("You have already submitted the attendance for today");
			navigate("/chat");
		}

		if (success) {
			alert.success("Attendance successfully submitted");
			navigate("/chat");
		}
	}, [
		dispatch,
		alert,
		error,
		user.userName,
		user.role,
		navigate,
		status,
		success,
	]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("girls", girls);
		formData.set("boys", boys);
		formData.set("className", className);

		// TODO: ask what to do
		if (girls === 0 || boys === 0 || girls === "0" || boys === "0") {
			alert.error("Attendance should be provided");
		} else if (girls > 50 || boys > 50) {
			alert.error("Attendance should not be greater than 50");
		} else if (girls % 1 !== 0 || boys % 1 !== 0) {
			alert.error("Attendance should not be a decimal values");
		} else {
			dispatch(markAttendance(formData));
		}
	};

	return (
		<div className="user-attendance-container">
			<NavBar />
			<div className="content">
				<div className="input-box">
					<form onSubmit={submitHandler}>
						<div className="avatar-container">
							<img
								src="../images/avatar.png"
								className="avatar"
								alt="avatar"
							/>
						</div>
						<h2 className="heading">{user.userName}</h2>
						<div className="user-attendance-input-group">
							<div id="boys-input" className="input-with-label">
								<input
									type="number"
									name="boys"
									value={boys}
									onChange={(e) => setBoys(e.target.value)}
									required
								/>
								<label>Boys</label>
							</div>
							<div className="input-with-label">
								<input
									type="number"
									name="girls"
									value={girls}
									onChange={(e) => setGirls(e.target.value)}
									required
								/>
								<label>Girls</label>
							</div>
						</div>
						<div className="btn-group">
							<button
								id="submit-btn"
								type="submit"
								disabled={loading ? true : false}
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default MarkAttendance;
