const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	resetPassword,
	getUserDetails,
	updateUserDetails,
	logoutUser,
	allUsers,
	getSingleUserDetails,
	updateUserDetailsByAdmin,
	deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router
	.route("/password/reset")
	.post(isAuthenticatedUser, authorizeRoles("god"), resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateUserDetails);

router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), allUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin,god"), getSingleUserDetails)
	.put(isAuthenticatedUser, authorizeRoles("admin,god"), updateUserDetailsByAdmin)
	.delete(isAuthenticatedUser, authorizeRoles("god"), deleteUser);

module.exports = router;
