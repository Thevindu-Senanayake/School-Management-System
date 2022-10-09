import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";

import { getOldMessages, sendMessages } from "../../actions/messageAction";
import { SEND_MESSAGES_RESET } from "../../constants/messageConstants";
import { clearErrors } from "../../actions/userActions";
import ChatInput from "./ChatInput";

const ChatContainer = ({ currentChat, socket }) => {
	const scrollRef = useRef();
	const dispatch = useDispatch();
	const alert = useAlert();

	const [messages, setMessages] = useState([]);
	const [newMessages, setNewMessages] = useState(null);
	const [sendMessage, setSendMessage] = useState(null);

	const {
		messages: oldMessages,
		success,
		error,
	} = useSelector((state) => state.messages);
	const { user, loading: authLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!authLoading) {
			dispatch(getOldMessages(currentChat._id, user._id));
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, currentChat._id, user._id, authLoading, error, alert]);

	useEffect(() => {
		setMessages(oldMessages);
	}, [oldMessages]);

	const handleSendMsg = (e, msg) => {
		e.preventDefault();

		setSendMessage(msg);
		socket.current.emit("send-msg", {
			to: currentChat._id,
			from: user._id,
			msg,
		});

		dispatch(sendMessages(currentChat._id, user._id, msg));
	};

	useEffect(() => {
		if (success) {
			const msgs = [...messages];
			msgs.push({ fromSelf: true, message: sendMessage });
			setMessages(msgs);
			dispatch({ type: SEND_MESSAGES_RESET });
		}
	}, [messages, success, dispatch, sendMessage]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-recieve", (msg) => {
				console.log(msg);
				setNewMessages({ fromSelf: false, message: msg });
			});
		}

		newMessages && setMessages((prev) => [...prev, newMessages]);
	}, [socket, newMessages]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Fragment>
			<div id="chat-name">
				<span>{currentChat.userName}</span>
				<img src="../icons/delete_black_24dp.svg" alt="delete chat" />
			</div>
			<div id="msg-list">
				{messages &&
					messages.map((message) => {
						return (
							<div
								key={uuidv4()}
								ref={scrollRef}
								className={`msg-row ${
									message.fromSelf ? "your-msg" : "their-msg"
								}`}
							>
								<div className="msg-text">{message.message}</div>
								<div className="msg-time">Oct 04</div>
							</div>
						);
					})}
			</div>
			<ChatInput handleSendMsg={handleSendMsg} />
		</Fragment>
	);
};

export default ChatContainer;