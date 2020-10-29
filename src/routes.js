const express = require("express");

const verifyToken = require("./helpers/verifyToken");
const validate = require("./validators/validator");
const handleFile = require("./middlewares/handleFiles");

const usersValidator = require("./validators/usersValidator");
const placesValidator = require("./validators/placesValidator");

const users = require("./controllers/users");
const places = require("./controllers/places");
const sports = require("./controllers/sports");
const courtTypes = require("./controllers/courtTypes");
const levels = require("./controllers/levels");

const routes = express.Router();

// Sports
routes.get("/api/sports", verifyToken, sports.list);

// Court Types
routes.get("/api/courtTypes", verifyToken, courtTypes.list);

// Levels
routes.get("/api/levels", verifyToken, levels.list);

// Users
routes.get(
  "/api/users",
  verifyToken,
  validate({ shape: usersValidator.get }),
  users.list
);
routes.get("/api/users/self", verifyToken, users.getSelf);
routes.get("/api/users/:id", verifyToken, users.get);
routes.post(
  "/api/users",
  validate({ shape: usersValidator.create, path: "body" }),
  users.create
);
routes.put("/api/users/:id/", verifyToken, users.update);
routes.put(
  "/api/users/:id/picture",
  verifyToken,
  handleFile.single("file"),
  users.updatePicture
);
// routes.delete("/api/user/:id/", verifyToken, users.destroy);
routes.post(
  "/api/users/signIn",
  validate({ shape: usersValidator.signIn, path: "body" }),
  users.signIn
);

// Places
routes.get(
  "/api/places",
  verifyToken,
  validate({ shape: placesValidator.get }),
  places.list
);
routes.get(
  "/api/places/:id",
  verifyToken,
  validate({ shape: placesValidator.get }),
  places.get
);
routes.put(
  "/api/places/:id",
  verifyToken,
  validate({ shape: placesValidator.update }),
  places.update
);
routes.put(
  "/api/places/:id/picture",
  verifyToken,
  handleFile.single("file"),
  places.updatePicture
);

module.exports = routes;
