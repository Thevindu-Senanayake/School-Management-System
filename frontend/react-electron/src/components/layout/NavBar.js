import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="navbar-container">
			<nav>
				<div className="navbar-content">
					<div className="navbar-hedding-container">
						<img src="../images/avatar.png" className="navbar-avatar" />
						<span className="username">Username</span>
					</div>
					<ul>
						<li className="nav-item">
							<a href="../Chat App/User.html">
								<i className="fas fa-comment navbar-icon"></i>
								<span className="nav-item-text">Message</span>
							</a>
						</li>
						<li className="nav-item">
							<a href="../old-attandances.html">
								<i className="fas fa-chart-bar navbar-icon"></i>
								<span className="nav-item-text">Attendance</span>
							</a>
						</li>
						<li className="nav-item logout">
							<a href="../Login.html">
								<i className="fas fa-sign-out-alt navbar-icon"></i>
								<span className="nav-item-text">Log out</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
