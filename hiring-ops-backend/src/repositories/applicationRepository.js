const Application = require("../models/Application");

const createApplication = (data) => {
  return Application.create(data);
};

const findApplication = (candidateId, jobId) => {
  return Application.findOne({ candidateId, jobId });
};

const getApplicationsByCandidate = (candidateId) => {
  return Application.find({ candidateId }).populate("jobId");
};

const getApplicantsByJob = (jobId) => {
  return Application.find({ jobId }).populate("candidateId");
};

const deleteApplication = (id, candidateId) => {
  return Application.findOneAndDelete({ _id: id, candidateId });
};

module.exports = {
  createApplication,
  findApplication,
  getApplicationsByCandidate,
  getApplicantsByJob,
  deleteApplication
};