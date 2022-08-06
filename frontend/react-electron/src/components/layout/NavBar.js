import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";

import { clearErrors } from "../../actions/authActions";
import Loader from "./Loader";

const NavBar = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, error, user, loading } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		console.log("isAuthenticated ", !isAuthenticated);
		if (loading === false && !isAuthenticated) {
			navigate("/login");
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, isAuthenticated, alert, error, navigate, loading]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div className="navbar-container">
						<nav>
							<div className="navbar-content">
								<div className="navbar-hedding-container">
									<img
										src="../images/avatar.png"
										alt="avatar"
										className="navbar-avatar"
									/>
									<span className="username">Username</span>
								</div>
								<ul>
									{user && user.role === "user" && (
										<Fragment>
											<li className="nav-item">
												<Link to="../Chat App/User.html">
													<i className="fas fa-comment navbar-icon"></i>
													<span className="nav-item-text">
														Message
													</span>
												</Link>
											</li>
											<li className="nav-item">
												<Link to="../old-attandances.html">
													<i className="fas fa-chart-bar navbar-icon"></i>
													<span className="nav-item-text">
														Attendance
													</span>
												</Link>
											</li>
										</Fragment>
									)}
									{user &&
										(user.role === "admin" ||
											user.role === "god") && (
											<Fragment>
												<li className="nav-item">
													<Link to="../Chat App/Admin.html">
														<i className="fas fa-comment navbar-icon"></i>
														<span className="nav-item-text">
															Message
														</span>
													</Link>
												</li>
												<li className="nav-item">
													<Link to="../registered-users.html">
														<i className="fas fa-database navbar-icon"></i>
														<span className="nav-item-text">
															Users
														</span>
													</Link>
												</li>
												<li className="nav-item">
													<Link to="../Admin-Attendance.html">
														<i className="fas fa-chart-bar navbar-icon"></i>
														<span className="nav-item-text">
															Attendance
														</span>
													</Link>
												</li>
												<li className="nav-item">
													<Link to="../Edit Profile.html">
														<i className="fas fa-cog navbar-icon"></i>
														<span className="nav-item-text">
															Edit Profile
														</span>
													</Link>
												</li>
											</Fragment>
										)}
									<li className="nav-item logout">
										<Link to="../Login.html">
											<i className="fas fa-sign-out-alt navbar-icon"></i>
											<span className="nav-item-text">Log out</span>
										</Link>
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default NavBar;
