const express = require("express");
const router = express.Router();

const {
	markAttendance,
	getOldAttendance,
	getTodayAttendance,
	getAllAttendance,
} = require("../controllers/attendanceController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/mark").post(isAuthenticatedUser, markAttendance);
router.route("/old").post(isAuthenticatedUser, getOldAttendance);

// Admin Routes
router
	.route("/admin")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), getTodayAttendance);
router
	.route("/admin/all")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), getAllAttendance);

module.exports = router;
