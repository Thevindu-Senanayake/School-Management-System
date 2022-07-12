const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: {
				type: String,
				required: [true, "Please enter your message."],
			},
		},
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", messageSchema);
