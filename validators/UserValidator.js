const { body, validationResult } = require("express-validator");
const { User } = require("../models/UserModel");

const listValidator = [
  body("firstName").notEmpty().withMessage("The first name is required."),
  body("lastName").notEmpty().withMessage("The last name is required."),
  body("phoneNumber")
    .notEmpty()
    .withMessage("The phone number is required.")
    .custom(async (value) => {
      const user = await User.findOne({ phoneNumber: value });
      if (user)
        throw new Error(
          "The phone number is already exists, and it should be unique."
        );
      return true;
    }),
  body("email")
    .optional()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user)
        throw new Error(
          "The email already is exists, and it should be unique."
        );
      return true;
    }),
  body("password").notEmpty().withMessage("The password is required."),
  body("location").optional(),
];

const handelErrors = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    res.status(400).json({
      state: "faild",
      stateCode: 400,
      message: results.array().map((r) => r.msg),
    });
    return;
  }
  next();
};

const createUserValidator = [listValidator, handelErrors];
module.exports = {
  createUserValidator,
};
