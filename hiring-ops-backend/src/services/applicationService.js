const applicationRepository = require("../repositories/applicationRepository");
const Job = require("../models/Job");
const Application = require("../models/Application");
const workflowTransitions = require("../config/workflowConfig");


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
const getMyApplications = (candidateId) => {
  return applicationRepository.getApplicationsByCandidate(candidateId);
};

const getApplicantsForJob = (jobId) => {
  return applicationRepository.getApplicantsByJob(jobId);
};

const withdrawApplication = (id, candidateId) => {
  return applicationRepository.deleteApplication(id, candidateId);
};

const moveApplicationStage = async (applicationId, recruiter, newStage) => {

  const application = await Application.findOne({
    _id: applicationId,
    companyId: recruiter.companyId
  });

  if (!application) {
    throw new Error("Application not found");
  }

  const currentStage = application.currentStage;

  if (["Offered", "Rejected"].includes(currentStage)) {
    throw new Error("Cannot move application after final decision");
  }

  const allowedTransitions = workflowTransitions[currentStage];

  if (!allowedTransitions.includes(newStage)) {
    throw new Error(`Invalid transition from ${currentStage} to ${newStage}`);
  }

  if (application.stageHistory.at(-1)?.stage === newStage) {
    throw new Error("Stage already applied");
  }

  application.currentStage = newStage;

  application.stageHistory.push({
    stage: newStage,
    movedBy: recruiter._id,
    movedAt: new Date()
  });

  await application.save();

  return application;
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  withdrawApplication,
  moveApplicationStage
};