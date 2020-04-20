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

/**
 * serializeUser determines which data of the user object should be stored in the session. 
 * The result of the serializeUser method is attached to the session as req.session.passport.user = {}. 
 * Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}
 */
PASSPORT.serializeUser((user, done) => done(null, user._id));

/**
 * The first argument of deserializeUser corresponds to the key of the user object that 
 * was given to the serializeUser done function. 
 * 
 * So your whole object is retrieved with help of that key. That key here is the user id. 
 * 
 * In deserializeUser that key is matched with the in memory array / database or any data resource.
 * The fetched object is attached to the request object as req.user
 */
PASSPORT.deserializeUser((id, done) => {
  return done(null, User.findById(id));
});

module.exports = PASSPORT;
