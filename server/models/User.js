"use strict";

// Import of the Mongoose library.
const MONGOOSE = require("mongoose");
const BCRYPT = require("bcrypt");
const SCHEMA = MONGOOSE.Schema;

// The Offers schema.
const UserSchema = SCHEMA(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true, trim: true },
    token: String,
    expiresAt: Date,
  },
  {
    // Dates.
    timestamps: { createdAt: true, updatedAt: true },

    // With this option, we avoid the property "__v" that MongoDB sets to every document by default.
    versionKey: false,
  }
);

// Using a Middleware before the model gets saved...
UserSchema.pre("save", function (next) {
  // If password is already hashed...
  if (!this.isModified("password")) {
    return next();
  }
  this.password = BCRYPT.hashSync(this.password, 10);
  next();
});

/**
 * Exporting the model.
 * - In the Node.js environment, we will use "User" as singular.
 * - In the DB, the collection will be named "users".
 */
module.exports = MONGOOSE.model("User", UserSchema);
