const mongoose = require("mongoose");

const notificationSchema =
  new mongoose.Schema(

    {
      recipientId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      type: {

        type: String,

        enum: [

          "APPLICATION_RECEIVED",

          "STAGE_UPDATED",

          "INTERVIEW",

          "OFFER",

          "SYSTEM",
        ],

        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },

      metadata: {
        applicationId: {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Application",
        },

        jobId: {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Job",
        },
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Notification",
    notificationSchema
  );
