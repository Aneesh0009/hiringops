const applicationService = require("../services/applicationService");

const applyJob = async (req, res) => {
  try {
    const jobId = req.body.jobId;

    const result = await applicationService.applyToJob(
      req.user,
      jobId
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const myApplications = async (req, res) => {
  try {
    const applications = await applicationService.getMyApplications(
      req.user._id
    );

    res.json(applications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const jobApplicants = async (req, res) => {
  try {
    const applicants = await applicationService.getApplicantsForJob(
      req.params.jobId
    );

    res.json(applicants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    await applicationService.withdrawApplication(
      req.params.id,
      req.user._id
    );

    res.json({ message: "Application withdrawn" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStage = async (req, res) => {
  try {
    const result = await applicationService.updateStage(
      req.params.id,
      req.body.stage,
      req.user._id
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  applyJob,
  myApplications,
  jobApplicants,
  withdraw,
  updateStage
};