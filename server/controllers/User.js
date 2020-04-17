"use strict";

// Import of the Offer model.
const User = require("../models/User");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to create a recruiter in DB.
  createUser: (request, response) => {
    // We validate the data received by the request.
    try {
      var VALIDATE_NAME = !VALIDATOR.isEmpty(request.body.name);
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
    if (
      VALIDATE_NAME &&
      VALIDATE_EMAIL &&
      VALIDATE_PASSWORD
    ) {
      // Save the object from the "request.body" property.
      User.create(request.body, (error, createdUser) => {
        // If there is any error when saving the user...
        if (error || !createdUser) {
          return response.status(500).send({
            status: "error",
            message:
              "The user has not been saved, something is wrong when saving it!",
          });
          // Otherwise, save the user and send a 200 response.
        } else {
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
