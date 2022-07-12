const User = require("../models/user");
const Message = require("../models/message");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
	try {
		const users = await User.find({ _id: { $ne: req.user.id } }).select([
			"userName",
			"role",
			"_id",
		]);

		res.status(200).json({
			success: true,
			users,
		});
	} catch (error) {
		return next(new ErrorHandler(error.message, 500));
	}
});

exports.addMsg = catchAsyncErrors(async (req, res, next) => {
	try {
		const { from, to, message } = req.body;

		// TODO: validate users

		const msg = await Message.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		});

		if (msg) {
			res.status(200).json({
				success: true,
				message: "Message added successfully",
			});
		} else {
			return next(new ErrorHandler("Message not added", 500));
		}
	} catch (error) {
		return next(new ErrorHandler(error.message, 500));
	}
});

exports.getAllMessages = catchAsyncErrors(async (req, res, next) => {
	try {
		const { from, to } = req.body;

		const messages = await Message.find({
			users: { $all: [from, to] },
		}).sort({ updatedAt: 1 });

		const allMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text,
			};
		});

		res.status(200).json(allMessages);
	} catch (error) {
		return next(new ErrorHandler(error.message, 500));
	}
});
