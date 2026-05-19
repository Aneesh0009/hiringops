const buildApplicationsByMonthAggregation = (companyId) => {
  return [
    {
      $match: { companyId },
    },
    {
      $group: {
        _id: {
          year: { $year: "$appliedAt" },
          month: { $month: "$appliedAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ];
};

module.exports = buildApplicationsByMonthAggregation;
