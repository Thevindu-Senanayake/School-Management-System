import React, { Fragment, useState } from "react";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const ChatInput = ({ handleSendMsg }) => {
	const [input, setInput] = useState("");
	const [emojiPanelVisibility, setEmojiPanelVisibility] = useState(false);

	const toggleEmojiPanel = () => {
		setEmojiPanelVisibility(!emojiPanelVisibility);
	};

	const handleEmojiClick = (emojiObject) => {
		let message = input;
		message += emojiObject.emoji;
		setInput(message);
	};

	const sendChat = (event) => {
		event.preventDefault();
		if (input.length > 0) {
			handleSendMsg(event, input);
			setInput("");
		}
	};

	return (
		<Fragment>
			{/* <div id="chat-area">
				<form
					onSubmit={(e) => sendChat(e, input)}
					style={{ display: "flex", width: "100%" }}
				>
					<div className="button-container">
						<div className="emoji">
							<img
								className="chat-insert-icon"
								src="../icons/attach-svgrepo-com.svg"
								alt="add file"
								onClick={toggleEmojiPanel}
							/>
							{emojiPanelVisibility && (
								<Picker onEmojiClick={handleEmojiClick} />
							)}
						</div>
					</div>
					<input
						className="send-msg"
						type="text"
						placeholder="Type your message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<img
						className="chat-send-icon"
						src="../icons/message-send-svgrepo-com.svg"
						alt="Send Icon"
						onClick={(e) => sendChat(e)}
					/>
				</form>
			</div> */}
			<Container>
				<div className="button-container">
					<div className="emoji">
						<img
							className="chat-insert-icon"
							src="../icons/attach-svgrepo-com.svg"
							alt="add file"
							onClick={toggleEmojiPanel}
						/>
						{emojiPanelVisibility && (
							<Picker onEmojiClick={handleEmojiClick} />
						)}
					</div>
				</div>
				<form
					className="input-container"
					onSubmit={(e) => sendChat(e, input)}
				>
					<input
						type="text"
						placeholder="type your message here"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit">
						<img
							className="chat-send-icon"
							src="../icons/message-send-svgrepo-com.svg"
							alt="Send Icon"
						/>
					</button>
				</form>
			</Container>
		</Fragment>
	);
};

const Container = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 5% 95%;
	background-color: #080420;
	padding: 0 2rem;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		padding: 0 1rem;
		gap: 1rem;
	}
	.button-container {
		display: flex;
		align-items: center;
		color: white;
		gap: 1rem;
		.emoji {
			position: relative;
			svg {
				font-size: 1.5rem;
				color: #ffff00c8;
				cursor: pointer;
			}
			.emoji-picker-react {
				position: absolute;
				top: -350px;
				background-color: #080420;
				box-shadow: 0 5px 10px #9a86f3;
				border-color: #9a86f3;
				.emoji-scroll-wrapper::-webkit-scrollbar {
					background-color: #080420;
					width: 5px;
					&-thumb {
						background-color: #9a86f3;
					}
				}
				.emoji-categories {
					button {
						filter: contrast(0);
					}
				}
				.emoji-search {
					background-color: transparent;
					border-color: #9a86f3;
				}
				.emoji-group:before {
					background-color: #080420;
				}
			}
		}
	}
	.input-container {
		width: 100%;
		border-radius: 2rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		background-color: #ffffff34;
		input {
			width: 90%;
			height: 60%;
			background-color: transparent;
			color: white;
			border: none;
			padding-left: 1rem;
			font-size: 1.2rem;

			&::selection {
				background-color: #9a86f3;
			}
			&:focus {
				outline: none;
			}
		}
		button {
			padding: 0.3rem 2rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #9a86f3;
			border: none;
			@media screen and (min-width: 720px) and (max-width: 1080px) {
				padding: 0.3rem 1rem;
				svg {
					font-size: 1rem;
				}
			}
			svg {
				font-size: 2rem;
				color: white;
			}
		}
	}
`;

export default ChatInput;
