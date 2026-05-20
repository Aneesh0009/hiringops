const { getIO } = require("../socket");
const applicationRepository = require("../repositories/applicationRepository");
const notificationRepository = require("../repositories/notificationRepository");
const Job = require("../models/Job");
const workflowTransitions = require("../config/workflowConfig");
const { FINAL_APPLICATION_STAGES } = require("../constants/applicationStages");

const applyToJob = async (user, jobId) => {
  const existing = await applicationRepository.findApplication(user._id, jobId);

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
    recruiterId: job.createdBy,
    candidateSnapshot: {
      fullName: user.fullName,
      email: user.email,
      designation: user.designation,
    },
    stageHistory: [
      {
        stage: "Applied",
        movedBy: user._id,
      },
    ],
  };

  const application =
    await applicationRepository.createApplication(applicationData);

  await notificationRepository.createNotification({
    recipientId: job.createdBy,
    type: "APPLICATION_RECEIVED",
    title: "New Application Received",
    message: `${user.fullName} applied for ${job.title}`,
    metadata: {
      applicationId: application._id,
      jobId: job._id,
    },
  });

  const io = getIO();
  io.to(job.createdBy.toString()).emit("new_notification", {
    title: "New Application",
    message: `${user.fullName} applied for ${job.title}`,
  });

  return application;
};

const getMyApplications = (candidateId) =>
  applicationRepository.getApplicationsByCandidate(candidateId);

const getRecruiterApplications = (recruiter, query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  return applicationRepository.getApplicationsByCompany(recruiter.companyId, {
    search: query.search ?? "",
    stage: query.stage,
    page,
    limit,
  });
};

const getApplicantsForJob = (jobId) =>
  applicationRepository.getApplicantsByJob(jobId);

const withdrawApplication = (id, candidateId) =>
  applicationRepository.deleteApplication(id, candidateId);

const moveApplicationStage = async (applicationId, recruiter, newStage) => {
  const application =
    await applicationRepository.findApplicationByIdForCompany(
      applicationId,
      recruiter.companyId,
    );

  if (!application) {
    throw new Error("Application not found");
  }

  const currentStage = application.currentStage;

  if (FINAL_APPLICATION_STAGES.includes(currentStage)) {
    throw new Error("Cannot move application after final decision");
  }

  const allowedTransitions = workflowTransitions[currentStage];

  if (!allowedTransitions?.includes(newStage)) {
    throw new Error(`Invalid transition from ${currentStage} to ${newStage}`);
  }

  if (application.stageHistory.at(-1)?.stage === newStage) {
    throw new Error("Stage already applied");
  }

  const updated = await applicationRepository.updateApplicationStage(
    { _id: applicationId, companyId: recruiter.companyId },
    {
      currentStage: newStage,
      $push: {
        stageHistory: {
          stage: newStage,
          movedBy: recruiter._id,
          movedAt: new Date(),
        },
      },
    },
  );

  if (!updated) {
    throw new Error("Application not found");
  }

  await notificationRepository.createNotification({
    recipientId: application.candidateId,
    type: "STAGE_UPDATED",
    title: "Application Status Updated",
    message: `Your application for ${application.jobId.title} moved to ${newStage}`,
    metadata: {
      applicationId: application._id,
      jobId: application.jobId,
    },
  });

  const io = getIO();
  io.to(application.candidateId.toString()).emit("new_notification", {
    title: "Stage Updated",
    message: `Application moved to ${newStage}`,
  });

  return updated;
};

module.exports = {
  applyToJob,
  getMyApplications,
  getRecruiterApplications,
  getApplicantsForJob,
  withdrawApplication,
  moveApplicationStage,
};
