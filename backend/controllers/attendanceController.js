const Attendance = require("../models/attendance");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { getDate, getMonth } = require("../utils/timeFormatter");

// Mark attendance  => /api/v1/attendance/mark
exports.markAttendance = catchAsyncErrors(async (req, res, next) => {
	const { girls, boys, className } = req.body;

	// check if each input is present
	if (!girls) {
		return next(new ErrorHandler("a value for girls is not defined", 400));
	}
	if (!boys) {
		return next(new ErrorHandler("a value for boys is not defined", 400));
	}
	if (!className) {
		return next(new ErrorHandler("class name not defined", 400));
	}

	const attendance = await Attendance.create({
		date: getDate(),
		month: getMonth(),
		girls,
		boys,
		className,
	});

	if (attendance) {
		res.status(201).json({
			success: true,
			attendance,
		});
	}
});

// get old attendance for user  => /api/v1/attendance/old
exports.getOldAttendance = catchAsyncErrors(async (req, res, next) => {
	const { className } = req.body;

	// check if each input is present
	if (!className) {
		return next(new ErrorHandler("class name not defined", 400));
	}

	const attendance = await Attendance.find({
		month: getMonth(),
		className: className,
	});

	if (attendance.length == 0) {
		return next(new ErrorHandler("can not find the records", 404));
	}

	if (attendance && attendance.length > 0) {
		res.status(200).json({
			success: true,
			attendance,
		});
	}
});

// Admin Routes
// Get today attendance	=> /api/v1/attendance/admin
exports.getTodayAttendance = catchAsyncErrors(async (req, res, next) => {
	const attendance = await Attendance.find({ date: getDate() });

	if (attendance && attendance.length > 0) {
		res.status(200).json({
			success: true,
			attendance,
		});
	} else {
		res.status(404).json({
			success: false,
			message: "Attendance Not Found",
		});
	}
});

// Get all attendance	=> /api/v1/attendance/admin/all
exports.getAllAttendance = catchAsyncErrors(async (req, res, next) => {
	const attendance = await Attendance.find();

	if (attendance && attendance.length > 0) {
		res.status(200).json({
			success: true,
			attendance,
		});
	} else {
		res.status(404).json({
			success: false,
		});
	}
});
