const User = require("../models/user");

const checkInactiveUsers = () => {
	setInterval(() => {
		const timeout = 180000; // 3 minutes (in milliseconds)
		User.updateMany(
			{ active: true, lastActive: { $lt: Date.now() - timeout } },
			{ active: false }
		);
	}, 30000); // check for inactive users every 30 seconds
};

module.exports = checkInactiveUsers;
