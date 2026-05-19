const analyticsRepository = require("../repositories/analyticsRepository");

const getFunnel = (companyId) => {
  return analyticsRepository.hiringFunnel(companyId);
};

const getTimeToHire = async (companyId) => {
  const result = await analyticsRepository.timeToHire(companyId);
  if (result.length === 0) {
    return { averageDays: 0 };
  }
  // The result is rounded to the nearest whole number.
  return { averageDays: Math.round(result[0].avgTimeToHire) || 0 };
};

const getTopJobs = (companyId) => {
  return analyticsRepository.topJobs(companyId);
};

const getRecruiterPerformance = (companyId) => {
  return analyticsRepository.recruiterPerformance(companyId);
};

const getApplicationsByMonth = (companyId) => {
  return analyticsRepository.applicationsByMonth(companyId);
};

module.exports = {
  getFunnel,
  getTimeToHire,
  getTopJobs,
  getRecruiterPerformance,
  getApplicationsByMonth,
};