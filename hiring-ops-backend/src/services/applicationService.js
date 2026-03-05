const applicationRepository = require("../repositories/applicationRepository");
const Job = require("../models/Job");
const Application = require("../models/Application");

const applyToJob = async (user, jobId) => {

  const existing = await applicationRepository.findApplication(
    user._id,
    jobId
  );

  if (existing) {
    throw new Error("Already applied to this job");
  }

  const job = await Job.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.status !== "open") {
    throw new Error("Job is closed");
  }

  const applicationData = {
    jobId,
    candidateId: user._id,
    companyId: job.companyId,

    candidateSnapshot: {
      fullName: user.fullName,
      email: user.email,
      designation: user.designation
    },

    stageHistory: [
      {
        stage: "Applied",
        movedBy: user._id
      }
    ]
  };

  return applicationRepository.createApplication(applicationData);
};
const updateStage = async (applicationId, newStage, recruiterId) => {
  const app = await Application.findById(applicationId);
  if (!app) {
    throw new Error("Application not found");
  }
  app.currentStage = newStage;
  app.stageHistory.push({
    stage: newStage,
    movedBy: recruiterId
  });
  await app.save();
  return app;
};

const getMyApplications = (candidateId) => {
  return applicationRepository.getApplicationsByCandidate(candidateId);
};

const getApplicantsForJob = (jobId) => {
  return applicationRepository.getApplicantsByJob(jobId);
};

const withdrawApplication = (id, candidateId) => {
  return applicationRepository.deleteApplication(id, candidateId);
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  withdrawApplication,
  updateStage
};