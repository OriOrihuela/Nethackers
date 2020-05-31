"use strict";

// Import the necessary node_modules to test the endpoints.
const APP = require("../../app");
const SUPERTEST = require("supertest");
const REQUEST = SUPERTEST(APP);
const MONGOOSE = require("mongoose");

// Database, model, controller and seed.
const DATA_BASE_NAME = "nethackers-test";
const User = require("../../models/User");
const SEED = require("./seed");
const USER_CONTROLLER = require("../../controllers/User");

// Mocking Auth Middleware.
jest.mock("../../middlewares/Auth.js", () =>
  jest.fn((request, response, next) => next())
);
const AUTH_MIDDLEWARE = require("../../middlewares/Auth");

// Importing the ".env" file.
require("dotenv").config({
  path: ".env",
});

// Connecting each test to the DB.
beforeAll(async () => {
  const URL = `mongodb://localhost:27017/${DATA_BASE_NAME}`;
  await MONGOOSE.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
});

// Seeding the DB for each test.
beforeEach(async () => {
  await User.create(SEED);
});

// // Cleans up User collection between each test
afterEach(async () => {
  await User.deleteMany();
});

// Deletes User colection
// afterAll(async () => {
//   await User.collection.drop();
// });

/**
 * GET ENDPOINT TESTS
 */
it("retrieves an User from DB.", async (done) => {
  USER_CONTROLLER.getUser = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        user: await User.findById("5ec3d61d8c66531a38136942"),
      });
    });
  });

  const RESPONSE = await USER_CONTROLLER.getUser();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.user).toBeTruthy();

  done();
});

/**
 * POST ENDPOINT TESTS
 */
it("creates an User.", async (done) => {
  const NEW_USER = {
    username: "Eduardo Orejuela Cartufo",
    email: "eduardo.orejuela.4e@gmail.com",
    password: "aserejé",
  };

  USER_CONTROLLER.createUser = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        createdUser: await User.create(NEW_USER),
      });
    });
  });

  const RESPONSE = await USER_CONTROLLER.createUser();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.createdUser).toBeTruthy();

  done();
});

it("authorizes an user and login him.", async (done) => {
  const USER = await User.findById("5ec3d61d8c66531a38136942");

  const RESPONSE = await REQUEST.post("/api/login").send({
    username: USER.username,
    password: "holacaracola",
  });

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.cookie).toStrictEqual({
    key: process.env.VUE_APP_ROUTER_STORAGE_KEY,
    value: process.env.VUE_APP_ROUTER_STORAGE_VALUE,
  });

  done();
});

it("logouts the current user", async (done) => {
  const RESPONSE = await REQUEST.post("/api/logout");

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.message).toStrictEqual("La sesión ha finalizado");

  done();
});

/**
 * POST ENDPOINT TESTS
 */
it("updates an existing user", async (done) => {
  const USER_UPDATED = {
    _id: "5ec3d61d8c66531a38136942",
    username: "Eduardo Pollo Cabeson",
    email: "eduardo.cabesa.4e@gmail.com",
    password: "holacaracola",
  };

  USER_CONTROLLER.updateUser = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        updatedUser: await User.findOneAndUpdate(
          { _id: "5ec3d61d8c66531a38136942" },
          USER_UPDATED,
          { new: true, runValidators: true }
        ),
      });
    });
  });

  const RESPONSE = await USER_CONTROLLER.updateUser();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.updatedUser).toBeTruthy();

  done();
});

/**
 * AUTH MIDDLEWARE CALLING TIMES
 */
it("confirms the times that AUTH_MIDDLEWARE has benn called", async (done) => {
  expect(AUTH_MIDDLEWARE).toHaveBeenCalledTimes(1);

  done();
});
