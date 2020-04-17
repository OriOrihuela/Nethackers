"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the "Article" controller.
const USER_CONTROLLER = require("../controllers/User");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */

/**
 * POST routes.
 */
ROUTER.post("/create-account", USER_CONTROLLER.createUser)

/**
 * PUT routes.
 */

/**
 * DELETE routes.
 */

// Here we export the module.
module.exports = ROUTER;
