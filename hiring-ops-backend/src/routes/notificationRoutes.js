const express = require("express");
const {
  getNotifications,
  readNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, readNotification);

module.exports = router;
