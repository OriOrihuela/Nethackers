"use strict";

// Import passport.
const PASSPORT = require("passport");
const LOCAL_STRATEGY = require("passport-local").Strategy;

// Import User model.
const User = require("../models/User");

/**
 * The Strategy that Passport will use in its "authenticate" method
 * By default, LocalStrategy expects to find credentials in parameters named "username" and "password"
 * If your site prefers to name these fields differently, options are available to change the defaults.
 * 
 * passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));
 */
PASSPORT.use(
  new LOCAL_STRATEGY(
    { passReqToCallback: true },
    (request, username, password, done) => {
      // Call the User model and find a user by his username.
      User.findOne({ username }, (error, user) => {
        // If any error occurs...
        if (error) {
          return done(error);
        }
        // If there is not any user with that username...
        else if (!user) {
          return done(
            null,
            false,
            request.flash("loginMessage", "Incorrect username")
          );
        }
        // If the user's password doesn't match with the introduced password...
        else if (!user.verifyPassword(password)) {
          return done(
            null,
            false,
            request.flash("loginMessage", "Incorrect password")
          );
        }
        // If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
        else {
          return done(null, user);
        }
      });
    }
  )
);

PASSPORT.serializeUser((user, done) => done(null, user._id));

PASSPORT.deserializeUser((id, done) => {
  return done(null, User.findById(id));
});

module.exports = PASSPORT;
