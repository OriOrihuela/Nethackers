"use strict";

const MULTER = require("multer");
const SHORT_ID = require("shortid");

// Multer options.
const CONFIG = {
  // Limits the total amount of bytes for each file.
  limits: { fileSize: 1000000 },
  // Where to store the files.
  storage: MULTER.diskStorage({
    // The folder to which the file has been saved.
    destination: (req, file, cb) => {
      cb(null, "server/uploads/cv");
    },
    // The name of the file within the destination above.
    filename: (req, file, cb) => {
      const EXTENSION = file.mimetype.split("/")[1];
      cb(null, `${SHORT_ID.generate()}.${EXTENSION}`);
    },
  }),
  // Function to control which files are accepted.
  fileFilter(req, file, cb, next) {
    if (file.mimetype === "application/pdf") {
      // The callback executes as true or false: true when mimetype is accepted.
      cb(null, true);
    } else {
      const ERROR = new Error("Format not valid; only PDF files.");
      ERROR.code = "NOT_PDF_FILE";
      cb(ERROR, false);
    }
  },
};

const UPLOAD = MULTER(CONFIG).any();
// const Upload = MULTER(CONFIG).single("cv")

module.exports = UPLOAD;
