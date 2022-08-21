import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../layout/NavBar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, clearErrors } from "../../../actions/userActions";
import { loadUser } from "../../../actions/authActions";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

const UpdateProfile = () => {
	const [name, setName] = useState("");

	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, isUpdated } = useSelector((state) => state.updateUser);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		setName(user.userName);

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("User Details updated successfully");
			dispatch({
				type: UPDATE_USER_RESET,
			});
		}
	}, [dispatch, isUpdated, alert, error, navigate, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("userName", name);

		dispatch(updateUser(user._id, formData));
		dispatch(loadUser());
	};

	const cancelHandler = (e) => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<div className="edit-profile-container">
				<NavBar />
				<div className="content">
					<div className="input-box">
						<form onSubmit={submitHandler}>
							<div className="avatar-container">
								<img
									src="./images/avatar.png"
									className="avatar"
									alt="Avatar"
								/>
							</div>
							<h2 className="hedding">Edit Profile</h2>
							<div className="input-with-label">
								<input
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<label>Username</label>
							</div>
							<div className="btn-group">
								<button
									htmlFor="cancel-btn"
									className="btn"
									onClick={cancelHandler}
								>
									Cancel
								</button>
								<button
									htmlFor="done-btn"
									className="btn"
									type="submit"
								>
									Done
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProfile;
