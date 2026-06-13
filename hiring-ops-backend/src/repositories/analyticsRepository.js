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
  const aggregation = buildApplicationsByMonthAggregation(companyId);
  return Application.aggregate(aggregation);
};

module.exports = {
  hiringFunnel,
  timeToHire,
  topJobs,
  recruiterPerformance,
  applicationsByMonth,
};

module.exports = {
  hiringFunnel,
  timeToHire,
  topJobs,
  recruiterPerformance,
  applicationsByMonth,
};
