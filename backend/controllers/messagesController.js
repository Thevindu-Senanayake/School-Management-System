const Messages = require("../models/message");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Get message	=> /api/v1/msg/getmsg
exports.getMessages = catchAsyncErrors(async (req, res, next) => {
	const { from, to } = req.body;

	// Check all inputs are present
	if (!from) {
		return next(new ErrorHandler("Sender is not specified", 400));
	}
	if (!to) {
		return next(new ErrorHandler("Receiver is not specified", 400));
	}

	const messages = await Messages.find({
		users: {
			$all: [from, to],
		},
	}).sort({ updatedAt: 1 });

	const utilizedMessages = messages.map((msg) => {
		return {
			fromSelf: msg.sender.toString() === from,
			message: msg.message,
			time: msg.time,
		};
	});
	res.status(200).json(utilizedMessages);
});

// Create message	=> /api/v1/msg/addmsg
exports.addMessage = catchAsyncErrors(async (req, res, next) => {
	const { from, to, message, time } = req.body;
	const data = await Messages.create({
		message: message,
		users: [from, to],
		sender: from,
		time: time
	});

	if (data) return res.status(200).json({ success: true });
	else
		return next(
			new ErrorHandler("Failed to add message to the database", 500)
		);
});

// Delete message	=> /api/v1/msg/:id
exports.deleteMessage = catchAsyncErrors(async (req, res, next) => {
	const message = await Messages.findById(req.params.id);

	if (message) {
		await message.remove();

		res.status(200).json({
			success: true,
		});
	} else {
		return next(
			new ErrorHandler(
				`message does not found with id: ${req.params.id}`,
				404
			)
		);
	}
});
