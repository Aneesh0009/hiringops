const jobService = require("../services/jobService");

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body, req.user);

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const result = await jobService.getJobs(req.query, req.user);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);

    res.json(job);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);

    res.json({
      message: "Job updated",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await jobService.deleteJob(req.params.id);
    res.json({
      message: "Job deleted",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
