"use strict";

// Import of the User model.
const User = require("../models/User");

// Import passport.
const PASSPORT = require("passport");

// Importing the "variables.env" file.
require("dotenv").config({
  path: "variables.env",
});

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

  // Behaviour to retrieve a user from DB.
  getUser: (request, response) => {
    // Get the user from the "request.user" property.
    User.findById(request.user._conditions._id, (error, user) => {
      // If the username or password already exist in DB...
      if (error) {
        return response.status(500).send({
          status: "error",
          message: `${error}`,
        });
      } else if (!user) {
        // If there is any other error when saving the user...
        return response.status(404).send({
          status: "error",
          message: "The required user does not exist",
        });
      } else {
        // Otherwise, save the user and send a 200 response.
        return response.status(200).send({
          status: "success",
          user,
        });
      }
    });
  },

  // Behaviour to update a user from DB.
  updateUser: (request, response) => {
    // Update the user using "request.user" property.
    User.findOneAndUpdate(
      { _id: request.user._conditions._id },
      request.body,
      { new: true },
      (error, updatedUser) => {
        // If there is any error...
        if (error) {
          return response.status(500).send({
            status: "error",
            message: `${error}`,
          });
        } else if (!updatedUser) {
          // If there is any other error when updating the user...
          return response.status(404).send({
            status: "error",
            message: "The required user does not exist",
          });
        } else {
          // Otherwise, save the user and send a 200 response.
          return response.status(200).send({
            status: "success",
            updatedUser,
          });
        }
      }
    );
  },

  // Behaviour to authenticate an existent user of the DB.
  authUser: (request, response) => {
    PASSPORT.authenticate("local", (error, user) => {
      if (error) {
        return response.status(500).send({
          status: "error",
          message: `${error}`,
        });
      } else if (!user) {
        return response.status(400).send({
          status: "bad request",
          message: `${request.flash("loginMessage")}`,
        });
      } else {
        request.login(user, (error) => {
          response.status(200).send({
            status: "success",
            localStorage: {
              key: process.env.VUE_APP_ROUTER_STORAGE_KEY,
              value: process.env.VUE_APP_ROUTER_STORAGE_VALUE,
            },
          });
        });
      }
    })(request, response);
  },

  // Behaviour to logout the user.
  logoutUser: (request, response) => {
    if (request.session) {
      request.session.destroy((error) => {
        if (error) {
          return response.status(500).send({
            status: "error",
            message: `${error}`,
          });
        } else {
          response.clearCookie(`${process.env.KEY}`);
          return response.status(200).send({
            status: "success",
            message: "La sesión ha finalizado",
          });
        }
      });
    }
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
