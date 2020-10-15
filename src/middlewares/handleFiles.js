const Multer = require("multer");
const path = require("path");
const { BadRequest } = require("../helpers/errors");

module.exports = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new BadRequest("Apenas imagens são permitidas"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});
