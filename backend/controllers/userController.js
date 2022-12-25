const User = require("../models/user");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Ping  => /api/v1/ping
exports.ping = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.body;

	// update the user's activity record to indicate that they are active
	User.updateOne(
		{ _id: id },
		{ active: true, lastActive: Date.now() },
		(error, user) => {
			if (error) {
				return next(new ErrorHandler(error, 500));
			}
			console.log(`[+] ping: ${user.modifiedCount} user online`);
			return res.json({ success: true });
		}
	);
});

// SetOffline  => /api/v1/offline
exports.setOffline = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.body;

	// update the user's activity record to indicate that they are active
	User.updateOne(
		{ _id: id },
		{ active: false, lastActive: Date.now() },
		(error, user) => {
			if (error) {
				return next(new ErrorHandler(error, 500));
			}
			console.log(`[-] ping: ${user.modifiedCount} user offline`);
			return res.json({ success: true });
		}
	);
});
