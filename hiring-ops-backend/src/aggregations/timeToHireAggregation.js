const buildTimeToHireAggregation = (companyId) => {
  return [
    {
      $match: {
        companyId,
        currentStage: "Offered",
      },
    },
    {
      $addFields: {
        offerStage: {
          $arrayElemAt: ["$stageHistory", -1],
        },
      },
    },
    {
      $project: {
        daysToHire: {
          $divide: [
            { $subtract: ["$offerStage.movedAt", "$appliedAt"] },
            1000 * 60 * 60 * 24,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        avgTimeToHire: { $avg: "$daysToHire" },
      },
    },
  ];
};

module.exports = buildTimeToHireAggregation;
