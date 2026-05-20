const jobRepository = require("../repositories/jobRepository");
const Application = require("../models/Application");

const createJob = async (data, user) => {
  const jobData = {
    ...data,
    companyId: user.companyId,
    createdBy: user._id,
  };

  return jobRepository.createJob(jobData);
};

const getJobs = async (query = {}, user = null) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const baseFilter = {};

  if (user?.companyId) {
    baseFilter.companyId = user.companyId;
  } else {
    baseFilter.status = "open";
  }

  return jobRepository.getJobsPaginated(baseFilter, {
    search: query.search ?? "",
    status: query.status,
    page,
    limit,
  });
};

const getJobById = async (jobId) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

const updateJob = async (jobId, updateData) => {
  const applicationCount = await Application.countDocuments({ jobId });

  if (applicationCount > 0 && updateData.salaryRange) {
    throw new Error("Salary cannot be modified after applications exist");
  }

  return jobRepository.updateJob(jobId, updateData);
};

const deleteJob = async (jobId) => {
  await jobRepository.deleteJob(jobId);
  return { message: "Job deleted" };
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
