const Job = require("../models/Job");

const createJob = async (jobData) => {
  return await Job.create(jobData);
};

const getJobs = async (filter = {}) => {
  return await Job.find(filter).sort({ createdAt: -1 });
};

const getJobById = async (jobId) => {
  return await Job.findById(jobId);
};

const updateJob = async (jobId, updateData) => {
  return await Job.findByIdAndUpdate(
    jobId,
    updateData,
    { new: true }
  );
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob
};