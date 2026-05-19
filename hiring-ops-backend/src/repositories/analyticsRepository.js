const Application = require("../models/Application");
const buildHiringFunnelAggregation = require("../aggregations/hiringFunnelAggregation");
const buildTimeToHireAggregation = require("../aggregations/timeToHireAggregation");
const buildTopJobsAggregation = require("../aggregations/topJobsAggregation");
const buildRecruiterPerformanceAggregation = require("../aggregations/recruiterPerformanceAggregation");
const buildApplicationsByMonthAggregation = require("../aggregations/applicationsByMonthAggregation");
const mongoose = require("mongoose");

const hiringFunnel = (companyId) => {
  const aggregation = buildHiringFunnelAggregation(companyId);
  return Application.aggregate(aggregation);
};

const timeToHire = (companyId) => {
  const aggregation = buildTimeToHireAggregation(companyId);
  return Application.aggregate(aggregation);
};

const topJobs = (companyId) => {
  const aggregation = buildTopJobsAggregation(companyId);
  return Application.aggregate(aggregation);
};

const recruiterPerformance = (companyId) => {
  const aggregation = buildRecruiterPerformanceAggregation(companyId);
  return Application.aggregate(aggregation);
};

const applicationsByMonth = (companyId) => {
  return Application.aggregate([
    {
      $match: { companyId },
    },
    {
      $group: {
        _id: {
          year: { $year: "$appliedAt" },
          month: { $month: "$appliedAt" },
        },
        applications: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

module.exports = {
  hiringFunnel,
  timeToHire,
  topJobs,
  recruiterPerformance,
  applicationsByMonth,
};
