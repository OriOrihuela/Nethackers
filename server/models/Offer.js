"use strict";

// Import of the Mongoose library.
const MONGOOSE = require("mongoose");
const SLUG = require("slug");
const SCHEMA = MONGOOSE.Schema;

// The Offers schema.
let OfferSchema = SCHEMA(
  {
    title: {
      type: String,
      required: "The name of the offer is required",
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: "The location is required",
      trim: true,
    },
    salary: {
      type: String,
      default: 0,
      trim: true,
    },
    contract: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      lowercase: true,
    },
    skills: [String],
    candidates: [
      {
        name: String,
        email: String,
        cv: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  // With this option, we avoid the property "__v" that MongoDB sets to every document by default.
  {
    versionKey: false,
  }
);

// Using a Middleware before the model gets saved...
OfferSchema.pre("save", function (next) {
  // We create the URL of the offer.
  const URL = SLUG(this.title);
  this.url = `${URL}-${this._id}`; // offer-title-12333243...
  next();
});

/**
 * Exporting the model.
 * - In the Node.js environment, we will use "Article" as singular.
 * - In the DB, the collection will be named "articles".
 */
module.exports = MONGOOSE.model("Offer", OfferSchema);
