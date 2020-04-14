"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the "Article" controller.
const OFFER_CONTROLLER = require("../controllers/Offer");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */
ROUTER.get("/", OFFER_CONTROLLER.getOffers);
ROUTER.get("/offers/:url", OFFER_CONTROLLER.getOffer);

/**
 * POST routes.
 */
ROUTER.post("/offers/new", OFFER_CONTROLLER.createNewOffer);

/**
 * PUT routes.
 */

/**
 * DELETE routes.
 */

// Here we export the module.
module.exports = ROUTER;
