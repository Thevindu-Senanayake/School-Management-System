const express = require("express");
const router = express.Router();

const {
	addMessage,
	getMessages,
	deleteMessage,
} = require("../controllers/messagesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/add-msg/", isAuthenticatedUser, addMessage);
router.post("/get-msg/", isAuthenticatedUser, getMessages);
router.delete("/:id/", isAuthenticatedUser, deleteMessage);

module.exports = router;
