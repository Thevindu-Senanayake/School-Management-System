const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const {
	markAttendance,
	getOldAttendance,
	getTodayAttendance,
	getAllAttendance,
} = require("../controllers/attendanceController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// rate limit for mark attendance
const markAttendanceLimiter = rateLimit({
	windowMs: 60 * 60 * 1000 * 24, // 24 hours
	max: 1, // Limit each IP to 1 mark attendance requests per `window` (here, per hour)
	message: "You have already submitted the attendance for today",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router
	.route("/mark")
	.post(isAuthenticatedUser, markAttendanceLimiter, markAttendance);
router.route("/old").post(isAuthenticatedUser, getOldAttendance);

// Admin Routes
router
	.route("/admin")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), getTodayAttendance);
router
	.route("/admin/all")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), getAllAttendance);

module.exports = router;
