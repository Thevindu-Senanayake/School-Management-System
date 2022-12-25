const express = require("express");
const router = express.Router();

const { ping, setOffline } = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/ping").post(ping);
router.route("/offline").post(setOffline);

module.exports = router;
