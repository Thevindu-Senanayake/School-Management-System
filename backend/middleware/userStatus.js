const User = require("../models/user");

const checkInactiveUsers = () => {
	setInterval(() => {
		const timeout = 180000; // 3 minutes (in milliseconds)
		User.updateMany(
			{ active: true, lastActive: { $lt: Date.now() - timeout } },
			{ active: false },
			(error, users) => {
				if (error) {
					console.error(error);
				}
				if (users) {
					if (users.modifiedCount > 0) {
						const timestamp = Date.now();
						const date = new Date(timestamp);
						const isoString = date.toISOString();
						console.log(
							`[+] timeout: ${users.modifiedCount} users in ${isoString}`
						);
					}
				}
			}
		);
	}, 30000); // check for inactive users every 30 seconds
};

module.exports = checkInactiveUsers;
