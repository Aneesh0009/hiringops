const buildTopJobsAggregation = (companyId) => {
  return [
    {
      $match: { companyId },
    },
    {
      $group: {
        _id: "$jobId",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "jobs",
        localField: "_id",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $unwind: "$job",
    },
    {
      $project: {
        _id: 0,
        title: "$job.title",
        applications: "$count",
      },
    },
    {
      $sort: { applications: -1 },
    },
    {
      $limit: 5,
    },
  ];
};

module.exports = buildTopJobsAggregation;
