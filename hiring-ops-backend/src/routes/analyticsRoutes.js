const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/hiring-funnel", analyticsController.getHiringFunnel);
router.get("/time-to-hire", analyticsController.getTimeToHire);
router.get("/top-jobs", analyticsController.getTopJobs);
router.get(
  "/recruiter-performance",
  analyticsController.getRecruiterPerformance,
);
router.get(
  "/applications-by-month",
  analyticsController.getApplicationsByMonth,
);

module.exports = router;