const express = require("express");

const { createUser, getUsers } = require("../controllers/UserServices");
const { createUserValidator } = require("../validators/UserValidator");

const UserRoutes = express.Router();

UserRoutes.post("/users", createUserValidator, createUser);
UserRoutes.get("/users", getUsers);
module.exports = UserRoutes;
