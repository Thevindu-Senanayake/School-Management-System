import React, { useEffect, Fragment } from "react";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userActions";
import { viewAttendance } from "../../actions/attendanceActions";

const ViewAttendance = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, loading, attendance } = useSelector(
		(state) => state.viewAttendance
	);
	const { user, loading: authLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!authLoading) {
			dispatch(viewAttendance(user.userName));
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, authLoading, user.userName]);
	return (
		<Fragment>
			{loading || authLoading ? (
				<Loader />
			) : (
				<Fragment>
					<div class="container">
						<NavBar />
						<div class="content-container">
							<h1 class="admin-old-attendance-headings">
								{user && user.userName}
							</h1>
							{/* // TODO: add a way to get total students in the className */}
							<h1 class="admin-old-attendance-headings">
								Total Students in Class = 45
							</h1>
							<div class="admin-old-attendance-tables">
								<table class="admin-old-attendance-table">
									<thead>
										<tr>
											<th>Date</th>
											<th>Girls</th>
											<th>Boys</th>
										</tr>
									</thead>
									<tbody>
										{attendance &&
											attendance.map((record) => (
												<tr>
													<td>{record.date}</td>
													<td>{record.boys}</td>
													<td>{record.girls}</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default ViewAttendance;
