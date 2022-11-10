const express = require("express");
const router = express.Router();

const {
	addMessage,
	getMessages,
	deleteMessage,
} = require("../controllers/messagesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/addmsg/", isAuthenticatedUser, addMessage);
router.post("/getmsg/", isAuthenticatedUser, getMessages);
router.delete("/:id/", isAuthenticatedUser, deleteMessage);

module.exports = router;
