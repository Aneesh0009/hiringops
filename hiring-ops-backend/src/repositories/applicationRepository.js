const Application = require("../models/Application");

const applicationPopulate = [
  { path: "candidateId", select: "fullName email" },
  { path: "jobId", select: "title status" },
  { path: "companyId", select: "name" },
];

const createApplication = (data) => Application.create(data);

const findApplication = (candidateId, jobId) =>
  Application.findOne({ candidateId, jobId });

const findApplicationByIdForCompany = (applicationId, companyId) =>
  Application.findOne({ _id: applicationId, companyId });

const updateApplicationStage = (filter, updateData) =>
  Application.findOneAndUpdate(filter, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("candidateId", "fullName email")
    .populate("jobId", "title")
    .populate("companyId", "name")
    .populate("recruiterId", "fullName email");

const getApplicationsByCandidate = (candidateId) =>
  Application.find({ candidateId })
    .populate("jobId", "title")
    .populate("companyId", "name")
    .sort({ createdAt: -1 });

const getApplicantsByJob = (jobId) =>
  Application.find({ jobId })
    .populate("candidateId", "fullName email")
    .populate("jobId", "title")
    .sort({ createdAt: -1 });

const getDistinctApplicantsByCompany = async (companyId, options = {}) => {
  const { search = "", page = 1, limit = 10 } = options;

  const match = { companyId };

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    match.$or = [
      { "candidateSnapshot.fullName": regex },
      { "candidateSnapshot.email": regex },
    ];
  }

  const basePipeline = [
    { $match: match },
    {
      $group: {
        _id: "$candidateId",
        candidateName: { $first: "$candidateSnapshot.fullName" },
        candidateEmail: { $first: "$candidateSnapshot.email" },
        candidateSnapshot: { $first: "$candidateSnapshot" },
        applicationsCount: { $sum: 1 },
        latestStage: { $last: "$currentStage" },
        lastApplied: { $max: "$appliedAt" },
        latestStatus: { $last: "$currentStage" },
        latestAppliedAt: { $max: "$appliedAt" },
      },
    },
  ];

  const [groupedApplicants, totalResult] = await Promise.all([
    Application.aggregate([
      ...basePipeline,
      { $sort: { lastApplied: -1, latestAppliedAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]),
    Application.aggregate([
      ...basePipeline,
      { $count: "total" },
    ]),
  ]);

  const total = totalResult[0]?.total ?? 0;

  return {
    applicants: groupedApplicants,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
};

const getApplicationsByCompany = async (companyId, options = {}) => {
  const {
    search = "",
    stage,
    page = 1,
    limit = 10,
  } = options;

  const query = { companyId };

  if (stage && stage !== "All") {
    query.currentStage = stage;
  }

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [
      { "candidateSnapshot.fullName": regex },
      { "candidateSnapshot.email": regex },
    ];
  }

  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    Application.find(query)
      .populate(applicationPopulate)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Application.countDocuments(query),
  ]);

  return {
    applications,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
};

const deleteApplication = (id, candidateId) =>
  Application.findOneAndDelete({ _id: id, candidateId });

module.exports = {
  createApplication,
  findApplication,
  findApplicationByIdForCompany,
  updateApplicationStage,
  getApplicationsByCandidate,
  getApplicantsByJob,
  getDistinctApplicantsByCompany,
  getApplicationsByCompany,
  deleteApplication,
};
