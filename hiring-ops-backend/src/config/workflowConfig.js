const workflowTransitions = {
  Applied: ["Screening", "Rejected"],
  Screening: ["Interview", "Rejected"],
  Interview: ["Offered", "Rejected"],
  Offered: [],
  Rejected: []
};

module.exports = workflowTransitions;