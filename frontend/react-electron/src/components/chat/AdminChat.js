import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { clearErrors } from "../../actions/authActions";
import { getAdminContacts } from "../../actions/userActions";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";

const AdminChat = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { users, error, loading } = useSelector(
		(state) => state.adminContacts
	);
	const { user, loading: authLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!authLoading) {
			dispatch(getAdminContacts(user._id));
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, authLoading, user._id]);
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
								{users.map((user) => (
									<div className="conversation" key={user._id}>
										<img src="../images/avatar.png" alt="avatar" />
										<div className="title-text">{user.userName}</div>
										<h3 className="status-tag">
											<span className="online"></span>
											online
										</h3>
										<div className="conv-msg">Sample</div>
									</div>
								))}
							</div>

							<div id="chat-name">
								<span>Username</span>
								<img
									src="../icons/delete_black_24dp.svg"
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
									src="../icons/attach-svgrepo-com.svg"
									alt="add file"
								/>
								<input
									className="send-msg"
									type="text"
									placeholder="Type your message"
								/>
								<img
									className="chat-send-icon"
									src="../icons/message-send-svgrepo-com.svg"
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

export default AdminChat;
