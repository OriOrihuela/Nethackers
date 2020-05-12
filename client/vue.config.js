"use strict";

const PATH = require("path");

module.exports = {
  outputDir: PATH.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:1212",
      },
    },
  },
};
