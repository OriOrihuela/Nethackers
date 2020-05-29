"use strict";

// Behaviour to verify if a user has logged in.
module.exports = (request, response, next) => {
  // Check if the user is authenticated or not.
  if (request.isAuthenticated()) {
    return next();
  } else {
    return response.status(401).send({
      status: "unauthorized",
      message: "The request is not authorized to do the operation",
    });
  }
};
