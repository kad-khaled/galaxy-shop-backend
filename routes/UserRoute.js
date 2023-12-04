const express = require("express");

const {
  deleteUser,
  signUp,
  getUsers,
  getUserByPhoneNumber,
} = require("../controllers/UserServices");
const { createUserValidator } = require("../validators/UserValidator");

const UserRoutes = express.Router();

UserRoutes.post("/users", createUserValidator, signUp);
UserRoutes.get("/users", getUsers);
UserRoutes.get("/users/:phoneNumber", getUserByPhoneNumber);
UserRoutes.delete("/users/:id", deleteUser);

module.exports = UserRoutes;
