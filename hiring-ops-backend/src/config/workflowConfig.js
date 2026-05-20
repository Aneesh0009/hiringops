const { APPLICATION_STAGES, FINAL_APPLICATION_STAGES } = require("../constants/applicationStages");

const workflowTransitions = {
  Applied: ["Screening", "Rejected"],
  Screening: ["Interview", "Rejected"],
  Interview: ["Offered", "Rejected"],
  Offered: [],
  Rejected: [],
};

// Safety: if stages change, config should be updated too.
for (const stage of APPLICATION_STAGES) {
  if (!Object.prototype.hasOwnProperty.call(workflowTransitions, stage)) {
    workflowTransitions[stage] = [];
  }
}

for (const stage of FINAL_APPLICATION_STAGES) {
  workflowTransitions[stage] = [];
}

module.exports = workflowTransitions;