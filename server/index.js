"use strict";

// Import the App.
const APP = require("./app");

// Import the DB config file.
require("./config/db");

// Importing the "variables.env" file.
require("dotenv").config({
  path: "variables.env",
});

// Heroku connection variable.
const PORT = process.env.PORT || process.env.LOCALHOST_PORT;

// The connection to the local DB.
APP.listen(PORT, () => {
  console.log("Server running in http://localhost:" + PORT);
});
