"use strict";

// Import of the Offer model.
const Offer = require("../models/Offer");

// Import of the node "validator" library.
const VALIDATOR = require("validator");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to retrieve all the offers kept in DB.
  getOffers: (request, response) => {
    Offer.find()
      .sort("createdAt")
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
  createOffer: (request, response) => {
    // We validate the data received by the request.
    try {
      var VALIDATE_TITLE = !VALIDATOR.isEmpty(request.body.title);
      var VALIDATE_COMPANY = !VALIDATOR.isEmpty(request.body.company);
      var VALIDATE_LOCATION = !VALIDATOR.isEmpty(request.body.location);
      var VALIDATE_CONTRACT = !VALIDATOR.isEmpty(request.body.contract);
    } catch (error) {
      // If there is not all the needed data...
      return response.status(500).send({
        status: "error",
        message:
          "There is some missing data to fill the offer model.",
      });
    }
    // If the required data exists...
    if (
      VALIDATE_TITLE &&
      VALIDATE_COMPANY &&
      VALIDATE_LOCATION &&
      VALIDATE_CONTRACT
    ) {
      // Save the object from the "request.body" property.
      Offer.create(request.body, (error, offerStored) => {
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

  // Behaviour to update an existent offer.
  updateOffer: (request, response) => {
    // We validate the data received by the request.
    try {
      var VALIDATE_TITLE = !VALIDATOR.isEmpty(request.body.title);
      var VALIDATE_COMPANY = !VALIDATOR.isEmpty(request.body.company);
      var VALIDATE_LOCATION = !VALIDATOR.isEmpty(request.body.location);
      var VALIDATE_CONTRACT = !VALIDATOR.isEmpty(request.body.contract);
    } catch (error) {
      // If there is not all the needed data...
      return response.status(500).send({
        status: "error",
        message:
          "There is some missing data to update the offer model.",
      });
    }
    // If the required data exists...
    if (
      VALIDATE_TITLE &&
      VALIDATE_COMPANY &&
      VALIDATE_LOCATION &&
      VALIDATE_CONTRACT
    ) {
      /**
       * Update the document filtering by the "url" property of the model.
       * Then, pass the object to be saved through "request.body".
       */
      Offer.findOneAndUpdate(
        { url: request.params.url },
        request.body,
        { new: true, runValidators: true },
        (error, offerUpdated) => {
          // If there is any error when updating the offer...
          if (error || !offerUpdated) {
            return response.status(500).send({
              status: "error",
              message:
                "The offer has not been updated, something is wrong when updating it!",
            });
            // Otherwise, update the offer and send a 200 response.
          } else {
            return response.status(200).send({
              status: "success",
              offerUpdated,
            });
          }
        }
      );
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
