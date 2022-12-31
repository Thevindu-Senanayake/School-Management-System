import React, { useState, useEffect } from "react";

const Contacts = ({ contacts, changeChat, status, searchQuery }) => {
	const [selected, setSelected] = useState(undefined);
	const [filteredUsers, setFilteredUsers] = useState([]);

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

	useEffect(() => {
		if (searchQuery) {
			const filteredObjects = contacts.filter((contact) =>
				contact.userName.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredUsers(filteredObjects);
		}
	}, [searchQuery, contacts]);

	return (
		<div id="conversation-list">
			{searchQuery && filteredUsers
				? filteredUsers.map((contact, index) => (
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
				  ))
				: contacts.map((contact, index) => (
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
