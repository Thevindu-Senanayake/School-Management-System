import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../../layout/NavBar";

import { adminAttendance } from "../../../actions/attendanceActions";
import Loader from "../../layout/Loader";

const Attendance = () => {
	const dispatch = useDispatch();

	const { attendance, loading } = useSelector((state) => state.viewAttendance);

	let grades = [];

	// const grades = [...attendance];
	for (let i = 6; i < 14; i++) {
		const gradeName = `Grade ${i}`;
		grades.push(gradeName);
	}

	useEffect(() => {
		dispatch(adminAttendance());
	}, [dispatch]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<div className="container">
					<NavBar />
					<div className="attendace-content">
						{grades.map((grade) => (
							<Fragment key={grade}>
								<br />
								<br />
								<div className="users">
									<section className="main-3 users">
										<div className="main-top-3">
											<h1 className="grade">{grade}</h1>
										</div>
										<div className="users">
											{attendance &&
												attendance[grade].map((record) => (
													<div className="card" key={record._id}>
														<img
															src="../images/avatar.png"
															alt="avatar"
														/>
														<h4>{record.className}</h4>
														<div className="per">
															<table>
																<tbody>
																	<tr>
																		<td>
																			<span>
																				{record.boys}
																			</span>
																		</td>
																		<td>
																			<span>
																				{record.girls}
																			</span>
																		</td>
																	</tr>
																	<tr>
																		<td>Girls</td>
																		<td>Boys</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<button
															type="submit"
															className="view-btn"
														>
															View
														</button>
													</div>
												))}
										</div>
									</section>
								</div>
							</Fragment>
						))}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Attendance;