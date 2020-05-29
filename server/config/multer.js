"use strict";

const MULTER = require("multer");
const SHORT_ID = require("shortid");

// Multer options.
const CONFIG = {
  limits: { fileSize: 1000000 },
  storage: MULTER.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "server/uploads/cv");
    },
    filename: (req, file, cb) => {
      const EXTENSION = file.mimetype.split("/")[1];
      cb(null, `${SHORT_ID.generate()}.${EXTENSION}`);
    },
  }),
  fileFilter(req, file, cb, next) {
    if (file.mimetype === "application/pdf") {
      // the callback executes as true or false: true when mimetype is accepted.
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
