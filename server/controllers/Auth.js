"use strict";

// Import passport.
const PASSPORT = require("passport");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to create a recruiter in DB.
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
            user,
          });
        });
      }
    })(request, response);
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
