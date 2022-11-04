const mongoose = require("mongoose");
const { getTime } = require("../utils/timeFormatter");

const MessageSchema = mongoose.Schema(
	{
		message: { type: String, required: true },
		users: Array,
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		time: {
			type: String,
			default: getTime(),
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Messages", MessageSchema);
