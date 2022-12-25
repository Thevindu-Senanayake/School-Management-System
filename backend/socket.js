const http = require("http");
const io = require("socket.io");

const app = require("./app");
const User = require("./models/user");

// initializing a server manually
const httpServer = http.createServer(app);

// creating a socket using the http server
const webSocket = io(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
});

global.onlineUsers = new Map();

webSocket.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	const socketId = socket.id;

	socket.on("disconnect", async () => {
		// Retrieve the user's id from the onlineUsers
		let userId;

		onlineUsers.forEach(async (value, key) => {
			if (value === socketId) {
				userId = key;

				// Create the request options
				const options = {
					hostname: "localhost",
					port: 3000,
					path: "/api/v1/offline",
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				};

				// Make the request
				const req = http.request(options, (res) => {
					console.log(`statusCode: ${res.statusCode}`);

					res.on("data", (d) => {
						process.stdout.write(d);
					});
				});

				req.on("error", (error) => {
					console.error(error);
				});

				// Write the data to the request body
				req.write(JSON.stringify({ id: userId }));

				req.end();
			}
		});
		console.log(`client ${userId} disconnected`);

		// Remove the user's id and socket id from the onlineUsers
		onlineUsers.delete(userId);
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg, data.time);
		}
	});
});

module.exports = httpServer;
