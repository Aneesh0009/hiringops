const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("candidate"),
  applicationController.applyJob,
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("candidate"),
  applicationController.myApplications,
);

router.get(
  "/recruiter",
  authMiddleware,
  roleMiddleware("recruiter"),
  applicationController.recruiterApplications,
);

router.get(
  "/recruiter/applicants",
  authMiddleware,
  roleMiddleware("recruiter"),
  applicationController.recruiterApplicants,
);

router.get(
  "/jobs/:jobId/applicants",
  authMiddleware,
  roleMiddleware("recruiter"),
  applicationController.jobApplicants,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("candidate"),
  applicationController.withdraw,
);

router.patch(
  "/:id/stage",
  authMiddleware,
  roleMiddleware("recruiter"),
  applicationController.moveStage,
);

module.exports = router;
