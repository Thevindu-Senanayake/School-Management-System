const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JsonWebToken");

// Register a user  => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { userName, password } = req.body;

	// check if user is already exsists
	const usercheck = await User.findOne({ userName });
	if (usercheck) {
		return next(new ErrorHandler("Username is already taken", 400));
	} else {
		const user = await User.create({
			userName,
			password,
		});

		sendToken(user, 200, res);
	}
});

// Login User  =>	/api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { userName, password } = req.body;

	// Checks if userName and password is entered by user
	if (!userName || !password) {
		return next(new ErrorHandler("Please enter username & password", 400));
	}

	// Finding user in database
	const user = await User.findOne({ userName }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid username or Password", 401));
	}

	// Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("your password is incorrect", 401));
	}

	sendToken(user, 200, res);
});

// Reset Password	=> /api/v1/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ userName: req.body.userName });

	if (!user) {
		return next(new ErrorHandler("User not found with this username", 404));
	}

	if (req.body.passwordResetCode !== process.env.PASSWORD_RESET_CODE) {
		return next(new ErrorHandler("Wrong password reset code", 401));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(
			new ErrorHandler("Password and confirm password does not match", 400)
		);
	}

	user.password = req.body.password;

	await user.save();

	sendToken(user, 200, res);
});

// Get currently logged in user details	=> /api/v1/me
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Update user Details	=> /api/v1/me/update
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		userName: req.body.userName,
	};

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Logout user  => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "You have logged out",
	});
});

// Admin Routes

// Get all users	=> /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get specific user Details by id	=> /api/v1/admin/user/:id
exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`user does not found with id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// Update user Details	=> /api/v1/admin/user/:id/update
exports.updateUserDetailsByAdmin = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		userName: req.body.userName,
		// role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Delete user	=> /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`user does not found with id: ${req.params.id}`)
		);
	}

	await user.remove();

	res.status(200).json({
		success: true,
	});
});
