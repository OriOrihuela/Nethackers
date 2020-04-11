"use strict";

// Import some Node modules.
const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");
const CORS = require("cors");
const COOKIE_PARSER = require("cookie-parser");
const SESSION = require("express-session");
const MONGOOSE = require("mongoose");
const REQUIRE_DIR = require("require-dir");
const MongoStore = require("connect-mongo")(SESSION); // Passing the SESSION variable to the package.

// Importing the "variables.env" file.
require("dotenv").config({
  path: "variables.env",
});

// Execute express (http).
const APP = EXPRESS();

// Upload route files.
const ROUTES = REQUIRE_DIR("./routes");

// Middlewares to process certain information before uploading some routes.
APP.use(BODY_PARSER.urlencoded({ extended: true }));
APP.use(BODY_PARSER.json());

// CORS (crossing access between domains -> allow HTTP / AJAX / Asynchronous requests).
APP.use(CORS());

/**
 * With this we will have the variable "req.session" available in our controllers,
 * and also a unique id for a user's session that we can access through the variable "req.sessionID".
 */
APP.use(COOKIE_PARSER());
APP.use(
  SESSION({
    secret: process.env.SECRET,
    key: process.env.KEY,
    // Forces the session to be saved back to the session store.
    resave: false,
    /**
     * Forces a session that is "uninitialized" to be saved to the store.
     * A session is uninitialized when it is new but not modified.
     */
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: MONGOOSE.connection,
    }),
  })
);

// Handle production.
if (process.env.NODE_ENV === "production") {
  // Static folder.
  APP.use(EXPRESS.static(__dirname + "/public/"));
  // Handle SPA.
  APP.get(/.*/, (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
  });
}

// Add prefixes to the routes (if necessary).
APP.use("/api", ROUTES.Offer);

// Export of this modules to be used in "index.js".
module.exports = APP;
