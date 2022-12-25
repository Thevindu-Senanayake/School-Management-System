import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

import { clearErrors } from "../../actions/authActions";
import { getAdmins } from "../../actions/userActions";

import NavBar from "../layout/NavBar";
import Loader from "../layout/Loader";
import NotFound from "../layout/NotFound";
import Contacts from "./Contacts";
import ChatContainer from "./ChatContainer";

const AdminChat = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const socket = useRef();

	const { admins, error, loading } = useSelector((state) => state.admins);
	const { user, loading: authLoading } = useSelector((state) => state.auth);

	const [currentChat, setCurrentChat] = useState(undefined);

	useEffect(() => {
		if (!authLoading) {
			if (user.role === "admin" || user.role === "god") {
				navigate("/admin/chat");
			}

			if (
				!(user.role === "admin") &&
				!(user.role === "god") &&
				!(user.role === "user")
			) {
				return <NotFound />;
			}
		}

		dispatch(getAdmins());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, navigate, user.role, authLoading]);

	useEffect(() => {
		if (user) {
			socket.current = io(process.env.REACT_APP_HOST, {
				query: {
					userId: user._id,
				},
			});

			socket.current.emit("add-user", user._id);

			// Ping
			socket.current.on("connect", async () => {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				await axios.post("/api/v1/ping", { id: user._id }, config);
			});

			setInterval(async () => {
				const config = {
					headers: {
						"Content-Type": "application/json",
					},
				};

				await axios.post("/api/v1/ping", { id: user._id }, config);
			}, 180000); // send a request every 3 minutes (180000 milliseconds)
		}
	}, [user]);

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
								contacts={admins}
								changeChat={handleChatChange}
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
