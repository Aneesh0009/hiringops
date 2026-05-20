const Job = require("../models/Job");

const createJob = async (jobData) => Job.create(jobData);

const getJobById = async (jobId) => Job.findById(jobId);

const updateJob = async (jobId, updateData) =>
  Job.findByIdAndUpdate(jobId, updateData, { new: true });

const find = async (filter) => Job.find(filter).sort({ createdAt: -1 });

const getJobsPaginated = async (baseFilter = {}, options = {}) => {
  const { search = "", status, page = 1, limit = 10 } = options;

  const query = { ...baseFilter };

  if (status && status !== "All") {
    query.status = status;
  }

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [{ title: regex }, { location: regex }];
  }

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    Job.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Job.countDocuments(query),
  ]);

  return {
    jobs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
};

const deleteJob = async (jobId) => {
  const job = await Job.findByIdAndDelete(jobId);
  if (!job) {
    throw new Error("Job not found");
  }
  return job;
};

module.exports = {
  createJob,
  getJobsPaginated,
  getJobById,
  updateJob,
  find,
  deleteJob,
};
