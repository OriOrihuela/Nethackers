"use strict";

// Import of the User model.
const User = require("../models/User");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to create a recruiter in DB.
  createUser: (request, response) => {
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
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
