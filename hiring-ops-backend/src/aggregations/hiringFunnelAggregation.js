const mongoose = require("mongoose");

const buildHiringFunnelAggregation = (companyId) => {
  return [
    {
      $match: {
        companyId: new mongoose.Types.ObjectId(companyId),
      },
    },
    {
      $group: {
        _id: "$currentStage",
        count: { $sum: 1 },
      },
    },
  ];
};

module.exports = buildHiringFunnelAggregation;
