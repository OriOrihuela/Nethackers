"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the User controller.
const USER_CONTROLLER = require("../controllers/User");

// Import the Auth controller.
const AUTH_CONTROLLER = require("../controllers/Auth");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */

/**
 * POST routes.
 */
ROUTER.post("/create-account", USER_CONTROLLER.createUser);
ROUTER.post("/login", AUTH_CONTROLLER.authUser);

/**
 * PUT routes.
 */

/**
 * DELETE routes.
 */

// Here we export the module.
module.exports = ROUTER;
