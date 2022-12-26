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
	let id;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
		id = userId;
		User.updateOne({ _id: userId }, { active: true }, (error, user) => {
			if (error) {
				console.error(error);
			} else {
				webSocket.emit("userStatusUpdate", { userId, active: true });
			}
		});
	});

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg, data.time);
		}
	});

	socket.on("logout", (userId) => {
		User.updateOne(
			{ _id: userId },
			{ active: false, lastActive: Date.now() },
			(error, user) => {
				if (error) {
					console.error(error);
				} else {
					webSocket.emit("userStatusUpdate", {
						userId,
						active: false,
						lastActive: Date.now(),
					});
				}
			}
		);
	});
	socket.on("disconnect", () => {
		User.updateOne(
			{ _id: id },
			{ active: false, lastActive: Date.now() },
			(error, user) => {
				if (error) {
					console.error(error);
				} else {
					webSocket.emit("userStatusUpdate", {
						userId: id,
						active: false,
						lastActive: Date.now(),
					});
				}
			}
		);
	});
});

module.exports = httpServer;
