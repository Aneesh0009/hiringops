const jobRepository = require("../repositories/jobRepository");
const Application = require("../models/Application");

const createJob = async (data, user) => {

  const jobData = {
    ...data,
    companyId: user.companyId,
    createdBy: user._id
  };

  return await jobRepository.createJob(jobData);
};

const getJobs = async () => {
  return await jobRepository.getJobs({ status: "open" });
};

const getJobById = async (jobId) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

const updateJob = async (jobId, updateData) => {

  const applicationCount =
    await Application.countDocuments({ jobId });

  if (applicationCount > 0 && updateData.salaryRange) {
    throw new Error(
      "Salary cannot be modified after applications exist"
    );
  }

  return await jobRepository.updateJob(jobId, updateData);
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob
};