"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the Offer controller.
const OFFER_CONTROLLER = require("../controllers/Offer");

// Import the Auth middleware.
const AUTH_MIDDLEWARE = require("../middlewares/Auth");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */
ROUTER.get("/", OFFER_CONTROLLER.getOffers);
ROUTER.get("/offers/:url", OFFER_CONTROLLER.getOffer);
ROUTER.get("/config-panel", OFFER_CONTROLLER.getOffersByRecruiter);

/**
 * POST routes.
 */
ROUTER.post(
  "/offers/new",
  AUTH_MIDDLEWARE.verifyUser,
  OFFER_CONTROLLER.createOffer
);
ROUTER.post(
  "/offers/contact/:url",
  OFFER_CONTROLLER.uploadCV
);

/**
 * PUT routes.
 */
ROUTER.put(
  "/offers/edit/:url",
  AUTH_MIDDLEWARE.verifyUser,
  OFFER_CONTROLLER.updateOffer
);
ROUTER.put(
  "/offers/contact/:url",
  OFFER_CONTROLLER.saveOfferApplicant
);

/**
 * DELETE routes.
 */
ROUTER.delete(
  "/offers/delete/:id",
  AUTH_MIDDLEWARE.verifyUser,
  OFFER_CONTROLLER.deleteOffer
);

// Here we export the module.
module.exports = ROUTER;
