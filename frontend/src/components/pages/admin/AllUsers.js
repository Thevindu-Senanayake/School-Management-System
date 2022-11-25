import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { clearErrors } from "../../../actions/authActions";
import { getAllUsers, updateUser } from "../../../actions/userActions";
import { loadUser } from "../../../actions/authActions";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";

import NavBar from "../../layout/NavBar";
import Loader from "../../layout/Loader";

const AllUsers = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, users, error } = useSelector((state) => state.allUsers);
	const {
		loading: updateLoading,
		success,
		error: updateError,
	} = useSelector((state) => state.updateUser);
	const { user } = useSelector((state) => state.auth);

	const changeRole = (user, role) => {
		const userData = {
			userName: user.userName,
			role: role,
		};

		dispatch(updateUser(userData, user._id));
	};

	useEffect(() => {
		if (user.role !== "admin" && user.role !== "god") {
			navigate("/");
		}

		dispatch(getAllUsers());

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("successfully updated");
			dispatch(getAllUsers());
			dispatch({ type: UPDATE_USER_RESET });
			dispatch(loadUser());
		}
	}, [dispatch, alert, error, updateError, success, user.role, navigate]);

	return (
		<Fragment>
			{loading || updateLoading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="all-users-container">
						<NavBar />
						<div className="content-container">
							<h1 className="heddings">Users</h1>
							<h1 className="heddings">
								Total Users = {users && users.length}
							</h1>
							<div className="all-users-tables">
								<table className="all-users-table">
									<thead>
										<tr>
											<th>Role</th>
											<th>User Name</th>
										</tr>
									</thead>
									<tbody>
										{users.map((user) => (
											<tr key={user.userName}>
												<td>
													<div className="all-users-select">
														<select
															id="all-users-standard-select"
															onChange={(e) =>
																changeRole(user, e.target.value)
															}
														>
															<option>
																{user.role === "god"
																	? "admin"
																	: user.role}
															</option>
															<option>
																{user.role === "admin" ||
																user.role === "god"
																	? "user"
																	: user.role === "user" &&
																	  "admin"}
															</option>
														</select>
														<span className="all-users-focus"></span>
													</div>
												</td>
												<td>{user.userName}</td>
											</tr>
										))}
										;
									</tbody>
								</table>
								;
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default AllUsers;
