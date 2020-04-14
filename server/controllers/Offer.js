"use strict";

// Import of the Offer model.
const Offer = require("../models/Offer");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Make the controller have the same prototype than Object.
let CONTROLLER = Object.create(Object);

// Define the controller with its own different behaviours.
CONTROLLER = {
  // Behaviour to retrieve all the offers kept in DB.
  getOffers: (request, response) => {
    Offer.find()
      .sort("date")
      .exec((error, offers) => {
        // If there is any error...
        if (error) {
          return response.status(500).send({
            status: "error",
            message: "Error when retrieving the offers.",
          });
          // Or there are not stored offers in the DB...
        } else if (!offers) {
          return response.status(404).send({
            status: "not found",
            message: "There aren't offers in the DB.",
          });
          // Return all the offers.
        } else {
          return response.status(200).send({
            status: "success",
            offers,
          });
        }
      });
  },

  // Behaviour to get a single offer.
  getOffer: (request, response) => {
    // Take the url from the request.
    const OFFER_URL = request.params.url;
    // Check if exists.
    if (!OFFER_URL || OFFER_URL === null) {
      return response.status(404).send({
        status: "not found",
        message: "An url is required to search for an offer!",
      });
    }
    // Look for the offer.
    Offer.findOne({ url: OFFER_URL }, (error, offer) => {
      // If there is any error retrieving the offer from the DB...
      if (error) {
        return response.status(500).send({
          status: "error",
          message: "Error when retrieving an offer with that url",
        });
        // If there is not any offer with that url...
      } else if (!offer) {
        return response.status(404).send({
          status: "not found",
          message: "There aren't offers in the DB with that url.",
        });
      } else {
        // Return the offer.
        return response.status(200).send({
          status: "success",
          offer,
        });
      }
    });
  },

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
