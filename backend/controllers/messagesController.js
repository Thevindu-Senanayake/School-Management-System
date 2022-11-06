const Messages = require("../models/message");

exports.getMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;

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
		res.json(utilizedMessages);
	} catch (ex) {
		next(ex);
	}
};

exports.addMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		const data = await Messages.create({
			message: message,
			users: [from, to],
			sender: from,
		});

		if (data)
			return res.json({ msg: "Message added successfully.", success: true });
		else
			return res.json({
				msg: "Failed to add message to the database",
				success: false,
			});
	} catch (ex) {
		next(ex);
	}
};

// Delete user	=> /api/v1/admin/user/:id
exports.deleteMessage = catchAsyncErrors(async (req, res, next) => {
	const message = await User.findById(req.params.id);

	if (!message) {
		return next(
			new ErrorHandler(`message does not found with id: ${req.params.id}`)
		);
	}

	await message.remove();

	res.status(200).json({
		success: true,
	});
});
