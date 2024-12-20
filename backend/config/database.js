const mongoose = require("mongoose");

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
};

module.exports = connectDatabase;
