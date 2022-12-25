const mongoose = require("mongoose");
const checkInactiveUsers = require("../middleware/userStatus");

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_REMOTE_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((con) => {
			console.log(
				`MongoDB Database connected with host: ${con.connection.host}`
			);
		})
		.catch((error) => {
			console.log(`Failed to connect mongoDB \n ${error}`);
		});

	// check for offline users
	mongoose.connection.on("connected", () => {
		checkInactiveUsers();
	});
};

module.exports = connectDatabase;
