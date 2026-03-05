const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
  phone: String,
  skills: [String],
  experience: Number,
  education: String,
  resumeUrl: String,
  location: String,
  links: [String]
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      required: true
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },

    fullName: {
      type: String,
      required: true
    },
    refreshToken: {
        type: String
    },

    designation: String,

    candidateProfile: candidateProfileSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);