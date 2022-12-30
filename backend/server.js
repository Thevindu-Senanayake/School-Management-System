const dotenv = require("dotenv");

const connectDatabase = require("./config/database");
const httpServer = require("./socket");

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log("shutting down server due to uncaught exception");
	process.exit(1);
});

const server = httpServer.listen(process.env.PORT, () => {
	console.log(
		`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});

// Handle EADDRINUSE error
server.on("error", (e) => {
	if (e.code === "EADDRINUSE") {
		console.log("Address in use, retrying...");
		setTimeout(() => {
			server.close();
			server.listen(process.env.PORT);
		}, 1000);
	}
});

// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log(`shutting down the server due to unhandled promise rejection.`);
	server.close(() => {
		process.exit(1);
	});
});
