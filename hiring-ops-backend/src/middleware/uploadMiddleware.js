const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

console.log("CloudinaryStorage:", CloudinaryStorage);

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "hiringops-resumes",

    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({ storage });

module.exports = upload;
