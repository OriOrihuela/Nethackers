"use strict";

// Import of the Mongoose library.
const MONGOOSE = require("mongoose");
const SLUG = require("slug");
const SCHEMA = MONGOOSE.Schema;

// The Offers schema.
const OFFER_SCHEMA = SCHEMA(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      default: 0,
      required: true,
      trim: true,
    },
    contract: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      lowercase: true,
    },
    skills: { type: [String], required: true },
    candidates: [
      {
        name: String,
        email: String,
        cv: String,
      },
    ],
    recruiter: {
      type: MONGOOSE.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Dates.
    timestamps: { createdAt: true, updatedAt: true },

    // With this option, we avoid the property "__v" that MongoDB sets to every document by default.
    versionKey: false,
  }
);

// Using a Middleware before the model gets saved...
OFFER_SCHEMA.pre("save", function (next) {
  // We create the URL of the offer.
  this.url = `${SLUG(this.title)}-${this._id}`; // offer-title-12333243...
  next();
});

// Creating an index to be applied on filters.
OFFER_SCHEMA.index({ title: "text" });

/**
 * Exporting the model.
 * - In the Node.js environment, we will use "Offer" as singular.
 * - In the DB, the collection will be named "offers".
 */
module.exports = MONGOOSE.model("Offer", OFFER_SCHEMA);
