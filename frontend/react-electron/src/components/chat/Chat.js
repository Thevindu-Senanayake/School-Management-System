import React from "react";
import chatStyles from "../../css/chat.module.css";

const Chat = () => {
	return (
		<div className={chatStyle.scontainer}>
			<div className={chatStyle.row, chatStyle.no-gutters}>
				<div className={chatStyle.col-md-4, chatStyle.border-right}>
					<div className="settings - tray">
						<img
							className={profile-image}
							src="../images/avatar.png"
							alt="Profile img"
						/>
						<span className="settings-tray--right">
							<i className="material-icons">menu</i>
						</span>
						<div className="username">
							<h1>User Name</h1>
						</div>
					</div>
					<div className="search-box">
						<div className="input-wrapper">
							<i className="material-icons">search</i>
							<input placeholder="Search here" type="text" />
						</div>
					</div>
					<div className="friend-drawer active friend-drawer--onhover">
						<div className="text">
							<h6>Robo Cop</h6>
							<p className="text-muted">Hey, you're arrested!</p>
						</div>
						<span className="time text-muted small">13:21</span>
					</div>
					<hr />
				</div>
				<div className="col-md-8">
					<div className="settings-tray">
						<div className="friend-drawer no-gutters friend-drawer--grey">
							<div className="text">
								<h6>Robo Cop</h6>
							</div>
							<span className="settings-tray--right">
								<i className="material-icons">menu</i>
							</span>
						</div>
					</div>
					<div className="chat-panel">
						<div className="row no-gutters">
							<div className="col-md-3">
								<div className="chat-bubble chat-bubble--left">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3 offset-md-9">
								<div className="chat-bubble chat-bubble--right">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3 offset-md-9">
								<div className="chat-bubble chat-bubble--right">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3">
								<div className="chat-bubble chat-bubble--left">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3">
								<div className="chat-bubble chat-bubble--left">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3">
								<div className="chat-bubble chat-bubble--left">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row no-gutters">
							<div className="col-md-3 offset-md-9">
								<div className="chat-bubble chat-bubble--right">
									Hello dude!
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<div className="chat-box-tray">
									<i className="material-icons">
										sentiment_very_satisfied
									</i>
									<input
										type="text"
										placeholder="Type your message here..."
									/>
									<i className="material-icons">send</i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
