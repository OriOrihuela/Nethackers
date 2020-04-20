"use strict";

// Import of the User model.
const User = require("../models/User");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to create a recruiter in DB.
  createUser: (request, response) => {
    // We validate the data received by the request.
    try {
      var VALIDATE_USERNAME = !VALIDATOR.isEmpty(request.body.username);
      var VALIDATE_EMAIL = !VALIDATOR.isEmpty(request.body.email);
      var VALIDATE_PASSWORD = !VALIDATOR.isEmpty(request.body.password);
    } catch (error) {
      // If there is not all the needed data...
      return response.status(500).send({
        status: "error",
        message: "There is some missing data to fill the offer model.",
      });
    }
    // If the required data exists...
    if (VALIDATE_USERNAME && VALIDATE_EMAIL && VALIDATE_PASSWORD) {
      // Save the object from the "request.body" property.
      User.create(request.body, (error, createdUser) => {
        // If the username or password already exist in DB...
        if (error && error.name === "MongoError" && error.code === 11000) {
          return response.status(422).send({
            status: "duplicated",
            message: "Username or password already exists.",
          });
        } else if (error || !createdUser) {
          // If there is any other error when saving the user...
          return response.status(500).send({
            status: "error",
            message: `The user has not been saved because ${error}`,
          });
        } else {
          // Otherwise, save the user and send a 200 response.
          return response.status(200).send({
            status: "success",
            createdUser,
          });
        }
      });
    } else {
      return response.status(500).send({
        status: "error",
        message: "Data is not valid.",
      });
    }
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
