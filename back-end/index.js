"use strict";

// Import some Node modules.
const MONGOOSE = require("mongoose");
const APP = require("./app");

// Deactivating old and deprecated behaviours.
MONGOOSE.set("useFindAndModify", false);

// Promises with MongoDB.
MONGOOSE.Promise = global.Promise;

// MongoDB Atlas and Heroku connection variables.
const PORT = process.env.PORT || 8080;
const MONGO_DB = process.env.MONGODB_URI || "mongodb://localhost:27017/nethackers";

// The connection to the local DB.
MONGOOSE.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log("The connection to the DB has been succesful!");
    // Creating the server and listen to the port.
    APP.listen(PORT, () => {
      console.log("Server running in http://localhost:" + PORT);
    });
  })
  .catch();
