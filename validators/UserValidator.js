const { body, param, validationResult } = require("express-validator");
const { User } = require("../models/UserModel");

const listSignUpValidator = [
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

const listDeleteValidator = [
  param("id")
    .isMongoId()
    .withMessage("The id of the object you want to delete is not valid."),
];

const listLoginValidator = [
  body("password").notEmpty().withMessage("the password is required."),
  body("phoneNumber").notEmpty().withMessage("the phone number is required."),
];

const handelErrors = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    res.status(400).json({
      state: "faild",
      stateCode: 400,
      message: results.array().map((r) => r.msg)[0],
    });
    return;
  }
  next();
};

const SignUpValidator = [listSignUpValidator, handelErrors];
const deleteUserValidator = [listDeleteValidator, handelErrors];
const loginValidator = [listLoginValidator, handelErrors];

module.exports = {
  SignUpValidator,
  deleteUserValidator,
  loginValidator,
};
