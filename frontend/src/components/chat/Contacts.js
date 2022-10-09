import React, { useState } from "react";

const Contacts = ({ contacts, changeChat }) => {
	const [selected, setSelected] = useState(undefined);

	const changeCurrentChat = (index, contact) => {
		setSelected(index);
		changeChat(contact);
	};
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
						<span className="online"></span>
						online
					</h3>
					<div className="conv-msg">Sample</div>
				</div>
			))}
		</div>
	);
};

export default Contacts;
