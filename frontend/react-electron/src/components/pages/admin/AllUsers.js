import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { clearErrors } from "../../../actions/authActions";
import { getAllUsers, updateUser } from "../../../actions/userActions";

import NavBar from "../../layout/NavBar";
import Loader from "../../layout/Loader";

const AllUsers = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, users, error } = useSelector((state) => state.allUsers);
	const {
		loading: updateLoading,
		success,
		error: updateError,
	} = useSelector((state) => state.allUsers);

	useEffect(() => {
		dispatch(getAllUsers());

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, updateError, success]);

	const changeRole = (user, role) => {
		const userData = {
			userName: user.userName,
			role: role,
			id: user._id,
		};

		dispatch(updateUser(userData));

		if (success) {
			alert.success(
				`successfully update ${user.userName}'s role to ${role}`
			);
		}
	};
	return (
		<Fragment>
			{loading || updateLoading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="all-users-container">
						<NavBar />
						<div className="all-users-content">
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
