const mongoose = require("mongoose");

const stageHistorySchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: ["Applied", "Screening", "Interview", "Offered", "Rejected"]
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

    candidateSnapshot: {
      fullName: String,
      email: String,
      designation: String
    },

    currentStage: {
      type: String,
      enum: ["Applied", "Screening", "Interview", "Offered", "Rejected"],
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

module.exports = mongoose.model("Application", applicationSchema);