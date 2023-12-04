const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectToMongoDB } = require("./DB_Connection");
const { User } = require("./UserModel");
const { body, validationResult } = require("express-validator");
const { Error } = require("mongoose");

dotenv.config();

const { PORT_NUM, DEV_MODE, MONGO_DB_URL } = process.env;

const app = express();
connectToMongoDB(MONGO_DB_URL);
app.use(express.json());

// use morgan only in the developpement mode
if (DEV_MODE === "DEV") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send({ result: "hello, world" });
});

const postUserValidator = [
  body("firstName").notEmpty().withMessage("The first name is required."),
  body("lastName").notEmpty().withMessage("The last name is required."),
  body("phoneNumber")
    .notEmpty()
    .withMessage("The phone number is required.")
    .custom(async (value) => {
      const user = await User.findOne({ phoneNumber: value });
      if (user)
        throw new Error("The phone number exists, and it should be unique.");
    }),
  body("email")
    .optional()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      console.log(user);
      if (user)
        throw new Error("The email already exists, and it should be unique.");
    }),
  body("password").notEmpty().withMessage("The password is required."),
];
app.post("/api/v1/users", postUserValidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({
      state: "faild",
      stateCode: 400,
      message: result.array().map((res) => res.msg),
    });
  }
  const userInfo = req.body;

  try {
    const user = User(userInfo);
    const savedUser = await user.save();
    // send the response if user saved successfully
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: savedUser,
    });
  } catch (err) {
    console.log("failed to save the user" + err.message);
  }
});

app.listen(PORT_NUM, () => {
  console.log(`server running in http://localhost:${PORT_NUM}`);
});
