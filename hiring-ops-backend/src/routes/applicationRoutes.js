const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/",authMiddleware,roleMiddleware("candidate"),applicationController.applyJob);
router.get("/my",authMiddleware,roleMiddleware("candidate"),applicationController.myApplications);
router.delete("/:id",authMiddleware,roleMiddleware("candidate"),applicationController.withdraw);
router.get("/jobs/:jobId/applicants",authMiddleware,roleMiddleware("recruiter"),applicationController.jobApplicants);
router.patch("/:id/stage",authMiddleware,roleMiddleware("recruiter"),applicationController.updateStage);

module.exports = router;
