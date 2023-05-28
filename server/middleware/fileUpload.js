const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const filename = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, "file-" + Date.now() + filename);
  },
});

const size = 5 * 1024 * 1024; // 5mb

const fileupload = multer({
  storage: storage,
  limit: { fileSize: size },
});

module.exports = fileupload;
