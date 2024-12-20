const User = require("../models/user");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(
			new ErrorHandler("Login first to access this resource.", 401)
		);
	}

	const decode = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decode.id);

	next();
});

// Handle users roles
exports.authorizeRoles = (roles) => {
	return (req, res, next) => {
		const authRoles = roles.split(",");
		if (!authRoles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role (${req.user.role}) is not allowed to access this resource`,
					403
				)
			);
		}
		next();
	};
};
