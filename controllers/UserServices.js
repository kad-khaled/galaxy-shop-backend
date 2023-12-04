const { validationResult } = require("express-validator");
const { User } = require("../models/UserModel");
const createUser = async (req, res) => {
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
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: "Internal error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: users || [],
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
};
