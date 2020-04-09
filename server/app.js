"use strict";

// Import some Node modules.
const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");
const CORS = require("cors");

// Execute express (http).
const APP = EXPRESS();

// Upload route files.

// Middlewares to process certain information before uploading some routes.
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

// CORS (crossing access between domains -> allow HTTP / AJAX / Asynchronous requests).
APP.use(CORS());

// Add prefixes or upload the routes.

// Handle production.
if (process.env.NODE_ENV === "production") {
  // Static folder.
  APP.use(EXPRESS.static(__dirname + "/public/"));
  // Handle SPA.
  APP.get(/.*/, (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
  });
}

// Export of this modules to be used in "index.js".
module.exports = APP;
