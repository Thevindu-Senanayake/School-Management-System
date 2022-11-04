const Messages = require("../models/message");

module.exports.getMessages = async (req, res, next) => {
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

module.exports.addMessage = async (req, res, next) => {
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
