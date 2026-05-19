const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/applications/:applicationId",authMiddleware,roleMiddleware("recruiter"),noteController.addNote);
router.get("/applications/:applicationId",authMiddleware,roleMiddleware("recruiter"),noteController.getNotes);
router.delete("/:noteId",authMiddleware,roleMiddleware("recruiter"),noteController.deleteNote);

module.exports = router;