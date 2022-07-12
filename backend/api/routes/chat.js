const express = require("express");
const router = express.Router();

const {
	getAllUsers,
	addMsg,
	getAllMessages,
} = require("../controllers/chatController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/allusers/:id").get(isAuthenticatedUser, getAllUsers);
router.route("/addmsg").post(isAuthenticatedUser, addMsg);
router.route("/getmsg").post(isAuthenticatedUser, getAllMessages);

module.exports = router;
