import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { clearErrors } from "../../../actions/authActions";
import { getAllUsers } from "../../../actions/userActions";

import NavBar from "../../layout/NavBar";
import Loader from "../../layout/Loader";

const AllUsers = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, users, error } = useSelector((state) => state.allUsers);

	useEffect(() => {
		dispatch(getAllUsers());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error]);
	return (
		<Fragment>
			{loading ? (
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
														<select id="all-users-standard-select">
															<option value="Role 2">
																{user.role === "god"
																	? "admin"
																	: user.role}
															</option>
															<option value="Role 3">
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
