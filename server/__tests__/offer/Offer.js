"use strict";

// Import the necessary node_modules to test the endpoints.
const APP = require("../../app");
const SUPERTEST = require("supertest");
const REQUEST = SUPERTEST(APP);
const MONGOOSE = require("mongoose");

// Database, model, controller and seed.
const DATA_BASE_NAME = "nethackers-test";
const Offer = require("../../models/Offer");
const SEED = require("./seed");
const OFFER_CONTROLLER = require("../../controllers/Offer");

// Mocking Auth Middleware.
jest.mock("../../middlewares/Auth.js", () =>
  jest.fn((request, response, next) => next())
);
const AUTH_MIDDLEWARE = require("../../middlewares/Auth");

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
  await Offer.create(SEED);
});

// // Cleans up Offer collection between each test
afterEach(async () => {
  await Offer.deleteMany();
});

// Deletes Offer colection
// afterAll(async () => {
//   await Offer.collection.drop();
// });

/**
 * GET ENDPOINT TESTS
 */
it("retrieves all offers from DB.", async (done) => {
  const RESPONSE = await REQUEST.get("/api");

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.offers).toStrictEqual(SEED);

  done();
});

it("retrieves a single offer which has a custom url property", async (done) => {
  const RESPONSE = await REQUEST.get(
    "/api/offers/react-developer-5e240e8b88e11002cc5d26fe"
  );

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.offer).toStrictEqual({
    _id: "5e240e8b88e11002cc5d26fe",
    salary: "2500€",
    skills: ["HTML5", "CSS3", "React", "React Native", "Firebase"],
    title: "React Developer",
    company: "Google",
    location: "New Hampshire, England",
    contract: "Part time",
    description: "Mock description 2",
    recruiter: "5ec3d61d8c66531a38136942",
    candidates: [
      {
        _id: "5ec42b62a1b8643f9c44e66a",
        name: "Eduardo Orihuela Verdugo",
        email: "eduardo.orihuela.4e@gmail.com",
        cv: "1RNzOVAgg.pdf",
      },
      {
        _id: "5ec42e7e8d98d944b039b642",
        name: "Pepito Palotes",
        email: "pepito@hotmail.com",
        cv: "HfaYBthYn.pdf",
      },
    ],
    createdAt: "2020-05-19T16:21:29.793Z",
    updatedAt: "2020-05-19T16:21:29.793Z",
    url: "react-developer-5e240e8b88e11002cc5d26fe",
  });

  done();
});

it("retrieves all offers made by a recruiter.", async (done) => {
  OFFER_CONTROLLER.getOffersByRecruiter = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        offers: await Offer.find({ recruiter: "5ec3d61d8c66531a38136942" }),
      });
    });
  });

  const RESPONSE = await OFFER_CONTROLLER.getOffersByRecruiter();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.offers).toBeTruthy();

  done();
});

it("retrieves a single offer to show its candidates", async (done) => {
  const RESPONSE = await REQUEST.get(
    "/api/candidates/nodejs-developer-5ecc240e8b88e110cc5d26fe"
  );

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.offer).toStrictEqual({
    _id: "5ecc240e8b88e110cc5d26fe",
    salary: "1500€",
    skills: ["HTML5", "CSS3", "CSSGrid"],
    title: "Node.js Developer",
    company: "Facebook",
    location: "Palma de Mallorca, Spain",
    contract: "Freelance",
    description: "Mock description 1",
    recruiter: "5ec3d61d8c66531a38136942",
    candidates: [],
    createdAt: "2020-05-19T16:21:29.793Z",
    updatedAt: "2020-05-19T16:21:29.793Z",
    url: "nodejs-developer-5ecc240e8b88e110cc5d26fe",
  });

  done();
});

it("cannot retrieve a CV from uploads/cv folder", async (done) => {
  const RESPONSE = await REQUEST.get(
    "/api/candidates/nodejs-developer-5ecc240e8b88e110cc5d26fe/xxRtbgH.pdf"
  );

  expect(RESPONSE.status).toBe(500);
  expect(RESPONSE.body.status).toStrictEqual("error");

  done();
});

it("retrieve a CV called dummy.pdf", async (done) => {
  const RESPONSE = await REQUEST.get(
    "/api/candidates/nodejs-developer-5ecc240e8b88e110cc5d26fe/dummy.pdf"
  );

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body).toBeTruthy();

  done();
});

/**
 * POST ENDPOINT TESTS
 */
it("creates a new Offer", async (done) => {
  const OFFER = {
    salary: "4500€",
    skills: ["Management", "Ensurance", "Reliability"],
    title: "Devops",
    company: "Google",
    location: "Silicon Valley",
    contract: "Freelance",
    description: "Mock description 5",
    recruiter: "5ec3d61d8c66531a38136942",
    candidates: [],
    createdAt: "2020-05-19T16:21:29.793Z",
    updatedAt: "2020-05-19T16:21:29.793Z",
  };

  OFFER_CONTROLLER.createOffer = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        offer: await Offer.create(OFFER),
      });
    });
  });

  const RESULT = await OFFER_CONTROLLER.createOffer();

  expect(RESULT.status).toBe("success");
  expect(RESULT.offer).toBeTruthy();

  const RESPONSE = await REQUEST.get(`/api/offers/${RESULT.offer.url}`);

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body.offer).toBeTruthy();

  done();
});

// it("save a PDF file (CV)", async (done) => {
//   const RESPONSE = await REQUEST.post("/api/offers/contact/url-123123").attach(
//     "files",
//     "server/uploads/cv/dummy.pdf"
//   );

//   expect(RESPONSE.status).toBe(200);
//   expect(RESPONSE.body.cv).toBeTruthy();

//   done();
// });

it("filter and retrieves the offers which their title match with the data passed in the request", async (done) => {
  const RESPONSE = await REQUEST.post("/api/filter").send({
    value: "Node.js Developer",
  });

  expect(RESPONSE.status).toBe(200);
  expect(RESPONSE.body.status).toStrictEqual("success");
  expect(RESPONSE.body).toBeTruthy();

  done();
});

/**
 * PUT ENDPOINT TESTS
 */
it("modifies an existing offer", async (done) => {
  const OFFER = {
    _id: "5ecc240e8b88e110cc5d26fe",
    salary: "2500€",
    skills: ["HTML5", "CSS3", "CSSGrid", "Javascript"],
    title: "Node.js Developer",
    company: "Google",
    location: "Barcelona, Spain",
    contract: "Tiempo Completo",
    description: "Mock description 1 modified",
    recruiter: "5ec3d61d8c66531a38136942",
    candidates: [],
    createdAt: "2020-05-19T16:21:29.793Z",
    updatedAt: "2020-05-19T16:21:29.793Z",
    url: "nodejs-developer-5ecc240e8b88e110cc5d26fe",
  };

  OFFER_CONTROLLER.updateOffer = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        offerUpdated: await Offer.findOneAndUpdate(
          { url: "nodejs-developer-5ecc240e8b88e110cc5d26fe" },
          OFFER,
          { new: true, runValidators: true }
        ),
      });
    });
  });

  const RESPONSE = await OFFER_CONTROLLER.updateOffer();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.offerUpdated).toBeTruthy();

  done();
});

it("saves a new candidate into an existing offer", async (done) => {
  OFFER_CONTROLLER.saveOfferCandidate = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      let offer = await Offer.findOne({
        url: "nodejs-developer-5ecc240e8b88e110cc5d26fe",
      });

      const newApplicant = {
        name: "Name Applicant",
        email: "Email Applicant",
        cv: "CV",
      };

      offer.candidates.push(newApplicant);

      if (await offer.save()) {
        resolve({
          status: "success",
          message: "CV saved properly",
        });
      }
    });
  });

  const RESPONSE = await OFFER_CONTROLLER.saveOfferCandidate();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.message).toStrictEqual("CV saved properly");

  done();
});

/**
 * DELETE ENDPOINT TESTS
 */
it("deletes an Offer from DB", async (done) => {
  OFFER_CONTROLLER.deleteOffer = jest.fn().mockImplementation(() => {
    return new Promise(async (resolve, reject) => {
      resolve({
        status: "success",
        offerDeleted: await Offer.findOneAndDelete({
          url: "nodejs-developer-5ecc240e8b88e110cc5d26fe",
          recruiter: "5ec3d61d8c66531a38136942",
        }),
      });
    });
  });

  const RESPONSE = await OFFER_CONTROLLER.deleteOffer();

  expect(RESPONSE.status).toStrictEqual("success");
  expect(RESPONSE.offerDeleted).toBeTruthy();

  done();
});

/**
 * AUTH MIDDLEWARE CALLING TIMES
 */
it("confirms the times that AUTH_MIDDLEWARE has benn called", async (done) => {
  expect(AUTH_MIDDLEWARE).toHaveBeenCalledTimes(3);

  done();
});
