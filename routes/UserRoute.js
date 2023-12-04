const express = require("express");

const {
  login,
  deleteUser,
  signUp,
  getUsers,
  getUserByPhoneNumber,
} = require("../controllers/UserServices");
const {
  createUserValidator,
  deleteUserValidator,
  loginValidator,
} = require("../validators/UserValidator");

const UserRoutes = express.Router();

UserRoutes.post("/users/login", loginValidator, login);
UserRoutes.post("/users", createUserValidator, signUp);
UserRoutes.get("/users", getUsers);
UserRoutes.get("/users/:phoneNumber", getUserByPhoneNumber);
UserRoutes.delete("/users/:id", deleteUserValidator, deleteUser);

module.exports = UserRoutes;
