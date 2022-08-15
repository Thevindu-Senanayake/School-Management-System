const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: [true, "Please enter the month"],
	},
	girls: {
		type: Number,
		required: [true, "Please enter the number of girls"],
	},
	boys: {
		type: Number,
		required: [true, "Please enter the number of boys"],
	},
	className: {
		type: String,
		required: [true, "Please enter the name of your class"],
		maxLength: [10, "Your class name cannot be longer than 10 characters."],
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: "1m",
	},
});

module.exports = mongoose.model("Attendance", attendanceSchema);
