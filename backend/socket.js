const http = require("http");
const io = require("socket.io");

const app = require("./app");

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

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg, data.time);
		}
	});
});

module.exports = httpServer;
