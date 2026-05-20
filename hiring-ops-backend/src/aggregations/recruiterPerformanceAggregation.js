const buildRecruiterPerformanceAggregation = (companyId) => {
  return [
    {
      $match: { companyId },
    },
    {
      $group: {
        _id: "$stageHistory.movedBy",
        applicationsProcessed: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "recruiter",
      },
    },
    {
      $unwind: "$recruiter",
    },
    {
      $project: {
        _id: 0,
        recruiter: "$recruiter.fullName",
        applicationsProcessed: 1,
      },
    },
    {
      $sort: { applicationsProcessed: -1 },
    },
  ];
};

module.exports = buildRecruiterPerformanceAggregation;
