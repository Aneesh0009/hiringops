const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/", protect, authorizeRoles("recruiter"), jobController.createJob);

router.get("/", protect, jobController.getJobs);

router.get("/:id", protect, jobController.getJobById);

router.get("/",protect, authorizeRoles("recruiter"), jobController.getRecruiterJobs);

router.patch("/:id",protect,authorizeRoles("recruiter"),jobController.updateJob,);

router.delete("/:id",protect,authorizeRoles("recruiter"),jobController.deleteJob);

module.exports = router;
