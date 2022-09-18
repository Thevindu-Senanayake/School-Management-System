const http = require("http");
const io = require("socket.io");

const app = require("./app");

// initializing a server manualy
const httpServer = http.createServer(app);

// creating a socket using the http server
const socket = io(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
});

module.exports = httpServer;
