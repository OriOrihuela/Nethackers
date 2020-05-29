"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the User controller.
const USER_CONTROLLER = require("../controllers/User");

// Import the Auth middleware.
const AUTH_MIDDLEWARE = require("../middlewares/Auth");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */
ROUTER.get("/edit-profile", AUTH_MIDDLEWARE, USER_CONTROLLER.getUser);

/**
 * POST routes.
 */
ROUTER.post("/create-account", USER_CONTROLLER.createUser);
ROUTER.post("/login", USER_CONTROLLER.authUser);
ROUTER.post("/logout", AUTH_MIDDLEWARE, USER_CONTROLLER.logoutUser);

/**
 * PUT routes.
 */
ROUTER.put("/edit-profile", AUTH_MIDDLEWARE, USER_CONTROLLER.updateUser);

/**
 * DELETE routes.
 */

// Here we export the module.
module.exports = ROUTER;
