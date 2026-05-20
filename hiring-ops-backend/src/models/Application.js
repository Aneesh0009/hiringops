const mongoose = require("mongoose");
const { APPLICATION_STAGES } = require("../constants/applicationStages");

const stageHistorySchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: APPLICATION_STAGES,
  },
  movedAt: {
    type: Date,
    default: Date.now
  },
  movedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    candidateSnapshot: {
      fullName: String,
      email: String,
      designation: String
    },

    currentStage: {
      type: String,
      enum: APPLICATION_STAGES,
      default: "Applied"
    },

    stageHistory: [stageHistorySchema],

    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ companyId: 1, currentStage: 1 });
applicationSchema.index({ companyId: 1, appliedAt: 1 });
applicationSchema.index({ companyId: 1, "stageHistory.movedBy": 1 });
applicationSchema.index({ recruiterId: 1, currentStage: 1 });

module.exports = mongoose.model("Application", applicationSchema);