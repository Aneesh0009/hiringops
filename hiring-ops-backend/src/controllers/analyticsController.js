const analyticsService = require("../services/analyticsService");

const getHiringFunnel = async (req, res) => {
  try {
    const result = await analyticsService.getFunnel(req.user.companyId);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTimeToHire = async (req, res) => {
  try {
    const result = await analyticsService.getTimeToHire(req.user.companyId);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTopJobs = async (req, res) => {
  try {
    const result = await analyticsService.getTopJobs(req.user.companyId);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getRecruiterPerformance = async (req, res) => {
  try {
    const result = await analyticsService.getRecruiterPerformance(
      req.user.companyId
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getApplicationsByMonth = async (req, res) => {
  try {
    const result = await analyticsService.getApplicationsByMonth(
      req.user.companyId
    );
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHiringFunnel,
  getTimeToHire,
  getTopJobs,
  getRecruiterPerformance,
  getApplicationsByMonth,
};

module.exports = {
  getHiringFunnel,
  getTimeToHire,
  getTopJobs,
  getRecruiterPerformance,
  getApplicationsByMonth,
};