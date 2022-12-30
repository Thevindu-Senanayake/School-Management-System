import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { io } from "socket.io-client";

import { clearErrors } from "../../actions/authActions";
import { getAdminContacts } from "../../actions/userActions";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";
import NotFound from "../layout/NotFound";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";

const AdminChat = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const socket = useRef();

	const { users, error, loading } = useSelector(
		(state) => state.adminContacts
	);
	const { user, loading: authLoading } = useSelector((state) => state.auth);

	const [currentChat, setCurrentChat] = useState(undefined);
	const [status, setStatus] = useState({});

	useEffect(() => {
		if (!authLoading) {
			if (
				!(user.role === "admin") &&
				!(user.role === "god") &&
				user.role === "user"
			) {
				navigate("/chat");
			}

			if (
				!(user.role === "admin") &&
				!(user.role === "god") &&
				!(user.role === "user")
			) {
				return <NotFound />;
			}
		}

		if (!authLoading) {
			dispatch(getAdminContacts(user._id));
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, authLoading, user._id, user.role, navigate]);

	useEffect(() => {
		if (user) {
			socket.current = io(process.env.REACT_APP_HOST);
			socket.current.emit("add-user", user._id);

			socket.current.on("userStatusUpdate", (data) => {
				if (Object.keys(status).length === 0) {
					setStatus({ [data.userId]: data.active });
				} else {
					setStatus({ ...status, [data.userId]: data.active });
				}
			});

			return () => {
				socket.current.off("userStatusUpdate");
			};
		}
	}, [user, status]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

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
							<Contacts
								contacts={users}
								changeChat={handleChatChange}
								status={status}
							/>
							{currentChat === undefined ? (
								<h1>select a chat</h1>
							) : (
								<ChatContainer
									currentChat={currentChat}
									socket={socket}
								/>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default AdminChat;
