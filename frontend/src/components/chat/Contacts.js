import React, { useState, useEffect } from "react";

const Contacts = ({ contacts, changeChat, status }) => {
	const [selected, setSelected] = useState(undefined);

	const changeCurrentChat = (index, contact) => {
		setSelected(index);
		changeChat(contact);
	};

	useEffect(() => {
		contacts.forEach((contact, index) => {
			if (status) {
				const keys = Object.keys(status);
				if (keys.indexOf(contact._id) !== -1) {
					let id = contact._id;
					const userStatus = status[id];
					if (userStatus) {
						contact.active = true;
					} else {
						contact.active = false;
					}
				} else {
					contact.active = false;
				}
			}
		});
	}, [contacts, status]);

	return (
		<div id="conversation-list">
			{contacts.map((contact, index) => (
				<div
					className={`conversation ${
						index === selected ? "selected" : ""
					}`}
					key={contact._id}
					onClick={() => changeCurrentChat(index, contact)}
				>
					<img src="../images/avatar.png" alt="avatar" />
					<div className="title-text">{contact.userName}</div>
					<h3 className="status-tag">
						<span
							className={contact.active ? "online" : "offline"}
						></span>
						{contact.active ? "online" : "offline"}
					</h3>
					<div className="conv-msg">Sample</div>
				</div>
			))}
		</div>
	);
};

export default Contacts;
