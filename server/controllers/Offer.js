"use strict";

// Import of the Offer model.
const Offer = require("../models/Offer");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Make the controller have the same prototype than Object.
let CONTROLLER = Object.create(Object);

// Define the controller with its own different behaviours.
CONTROLLER = {
  // Behaviour to save any offer.
  createNewOffer: (request, response) => {
    // We validate the data received by the request.
    try {
      var VALIDATE_TITLE = !VALIDATOR.isEmpty(request.body.title);
      var VALIDATE_COMPANY = !VALIDATOR.isEmpty(request.body.company);
      var VALIDATE_LOCATION = !VALIDATOR.isEmpty(request.body.location);
    } catch (error) {
      // If there is not all the needed data...
      return response.status(500).send({
        status: "error",
        message:
          "There is some missing data. It is necessary to fill the offer at least with a title, company and location",
      });
    }
    // If the required data exists...
    if (VALIDATE_TITLE && VALIDATE_COMPANY && VALIDATE_LOCATION) {
      // Create a new Offer with the data received by the request.
      const OFFER = new Offer(request.body);
      // Save it.
      OFFER.save((error, offerStored) => {
        // If there is any error when saving the offer...
        if (error || !offerStored) {
          return response.status(500).send({
            status: "error",
            message:
              "The offer has not been saved, something is wrong when saving it!",
          });
          // Otherwise, save the offer and send a 200 response.
        } else {
          return response.status(200).send({
            status: "success",
            offerStored,
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
