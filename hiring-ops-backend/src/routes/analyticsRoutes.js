const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/funnel",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  analyticsController.getHiringFunnel
);

router.get(
  "/monthly-applications",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  analyticsController.getApplicationsByMonth
);

router.get(
  "/top-jobs",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  analyticsController.getTopJobs
);

router.get(
  "/time-to-hire",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  analyticsController.getTimeToHire
);

router.get(
  "/recruiter-performance",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  analyticsController.getRecruiterPerformance
);

module.exports = router;