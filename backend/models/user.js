const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: [true, "Please enter your name."],
		maxLength: [30, "Your name cannot be longer than 30 characters."],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: [6, "Your password has to be longer than 6 characters."],
		select: false,
	},
	role: {
		type: String,
		default: "user",
	},
	active: {
		type: Boolean,
	},
	lastActive: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
	// return to next middleware if password is not modified
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enterdPassword) {
	return await bcrypt.compare(enterdPassword, this.password);
};

// Return JSON Web Token
userSchema.methods.getJwt = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
};

module.exports = mongoose.model("User", userSchema);
