"use strict";

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to save any article.
  createNewOffer: (request, response) => {
    response.send("it works!");
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
