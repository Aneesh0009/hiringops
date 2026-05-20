const User = require("../models/User");

const uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.resumeUrl = req.file.path;

    await user.save();

    res.json({
      success: true,

      resumeUrl: user.resumeUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};
