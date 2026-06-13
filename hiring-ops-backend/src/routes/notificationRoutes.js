const express = require("express");
const notificationController = require("../controllers/notificationController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/", protect, notificationController.getNotifications);
router.patch("/:id/read", protect, notificationController.readNotification);

module.exports = router;
