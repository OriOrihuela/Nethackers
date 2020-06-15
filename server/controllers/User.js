"use strict";

// Import of the User & Offer models.
const User = require("../models/User");
const Offer = require("../models/Offer");

// Import passport.
const PASSPORT = require("passport");

// Importing the ".env" file.
require("dotenv").config({
  path: ".env",
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
      { new: true, runValidators: true },
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
    // Call the authenticate behaviour of Passport defined in "config" folder.
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
        // Passport exposes a login() function on req that can be used to establish a login session.
        request.login(user, (error) => {
          response.status(200).send({
            status: "success",
            cookie: {
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
    // If the request has a session instance...
    if (request.session) {
      // Call the destroy method to end it.
      request.session.destroy((error) => {
        if (error) {
          return response.status(500).send({
            status: "error",
            message: `${error}`,
          });
        } else {
          // Remove the back-end cookie.
          response.clearCookie(`${process.env.KEY}`);
          return response.status(200).send({
            status: "success",
            message: "La sesión ha finalizado",
          });
        }
      });
    }
  },

  // Behaviour to delete an user.
  deleteUser: async (request, response) => {
    // Get the user._id from the request.
    const USER_ID = request.user._conditions._id;
    // Delete all the offers related to that user.
    Offer.deleteMany(
      {
        recruiter: USER_ID,
      },
      (error, offersDeleted) => {
        // If there is any error when deleting the offers...
        if (error || !offersDeleted) {
          return response.status(500).send({
            status: "error",
            message: `The offers have not been deleted because of ${error}`,
          });
          // Otherwise, delete the user account.
        } else {
          User.deleteOne({ _id: USER_ID }, (error, userDeleted) => {
            // If there is any error when deleting the user account...
            if (error || !userDeleted) {
              return response.status(500).send({
                status: "error",
                message: `Couldn't delete account because of ${error}`,
              });
            } else {
              return response.status(200).send({
                status: "success",
                userDeleted,
              });
            }
          });
        }
      }
    );
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
