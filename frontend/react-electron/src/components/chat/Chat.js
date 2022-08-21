import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { clearErrors } from "../../actions/authActions";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";

const Chat = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, error, user, loading } = useSelector(
		(state) => state.auth
	);

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
					<div className="container">
						<NavBar />
						<div id="chat-cont">
							<div id="search-cont">
								<input type="text" placeholder="Search" />
							</div>
							<div id="conversation-list">
								<div className="conversation">
									<img src="images/avatar.png" alt="Ankit" />
									<div className="title-text">
										{user && user.name && user.name}
									</div>
									<h3 className="status-tag">
										<span className="online"></span>
										online
									</h3>
									<div className="conv-msg">Sample</div>
								</div>
							</div>

							<div id="chat-name">
								<span>Username</span>
								<img
									src="icons/delete_black_24dp.svg"
									alt="delete chat"
								/>
							</div>
							<div id="msg-list">
								<div className="msg-row their-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row your-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row their-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row their-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row your-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row their-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row your-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
								<div className="msg-row their-msg">
									<div className="msg-text">Sample Text</div>
									<div className="msg-time">Oct 04</div>
								</div>
							</div>
							<div id="chat-area">
								<img
									className="chat-insert-icon"
									src="icons/attach-svgrepo-com.svg"
									alt="add file"
								/>
								<input
									class="send-msg"
									type="text"
									placeholder="Type your message"
								/>
								<img
									className="chat-send-icon"
									src="icons/message-send-svgrepo-com.svg"
									alt="Send Icon"
								/>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Chat;
