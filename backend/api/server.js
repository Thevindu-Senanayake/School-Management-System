const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");
const socket = require("socket.io");

// setting up config file
dotenv.config({ path: "backend/api/config/config.env" });

// connecting to database
connectDatabase();

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log("shutting down server due to uncaught exeption");
	process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
	console.log(
		`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});

// handle unhadled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log(`shutting down the server due to unhandled promise rejection.`);
	server.close(() => {
		process.exit(1);
	});
});
