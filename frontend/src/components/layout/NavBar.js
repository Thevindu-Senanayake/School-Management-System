import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";

import { clearErrors } from "../../actions/authActions";
import { logOut } from "../../actions/authActions";
import Loader from "./Loader";

const NavBar = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, error, user, loading } = useSelector(
		(state) => state.auth
	);

	const logoutHandler = () => {
		dispatch(logOut());
		alert.success("Logged out successfully");
	};

	useEffect(() => {
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
						<nav className="navbar">
							<div className="navbar-content">
								<div className="navbar-hedding-container">
									<img
										src="../images/avatar.png"
										alt="avatar"
										className="navbar-avatar"
									/>
									<span className="username">
										{user && user.userName}
									</span>
								</div>
								<div className="nav-elements">
									<ul>
										<li className="nav-item">
											<Link to="/">
												<i className="fas fa-comments navbar-icon"></i>
												<span className="nav-item-text">
													Message
												</span>
											</Link>
										</li>
										{user && user.role === "user" ? (
											<Fragment>
												<li className="nav-item">
													<Link to="/attendance/mark">
														<i className="fas fa-marker navbar-icon"></i>
														<span className="nav-item-text nav-item-text-resized">
															Mark Attendance
														</span>
													</Link>
												</li>
												<li className="nav-item">
													<Link to="/attendance/view">
														<i className="fas fa-users navbar-icon"></i>
														<span className="nav-item-text nav-item-text-resized">
															View Attendance
														</span>
													</Link>
												</li>
											</Fragment>
										) : (
											(user.role === "admin" ||
												user.role === "god") && (
												<Fragment>
													<li className="nav-item">
														<Link to="/all-users">
															<i className="fas fa-users navbar-icon"></i>
															<span className="nav-item-text">
																Users
															</span>
														</Link>
													</li>
													<li className="nav-item">
														<Link to="/attendance">
															<i className="fas fa-chart-bar navbar-icon"></i>
															<span className="nav-item-text">
																Attendance
															</span>
														</Link>
													</li>
													<li className="nav-item">
														<Link to="/edit-profile">
															<i className="fas fa-user-edit navbar-icon"></i>
															<span className="nav-item-text">
																Edit Profile
															</span>
														</Link>
													</li>
												</Fragment>
											)
										)}
									</ul>
									<div className="nav-item logout">
										<button
											className="logout-button"
											type="submit"
											onClick={logoutHandler}
										>
											<i className="fas fa-sign-out-alt navbar-icon"></i>
											<span className="nav-item-text">Log out</span>
										</button>
									</div>
								</div>
							</div>
						</nav>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default NavBar;
