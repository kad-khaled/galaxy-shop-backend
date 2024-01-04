const { User } = require("../models/UserModel");
const bcryprt = require("bcrypt");

const signUp = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = User(userInfo);
    const savedUser = await user.save();
    if (!savedUser) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `Failed to signUp a new user .`,
      });
      return;
    }
    delete savedUser.__v;
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
    const users = await User.find({}).select("-__v");
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

const getUserByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber }).select(
      "-__v"
    );
    if (!user) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the user with phone number (${phoneNumber}) is not found.`,
      });
      return;
    }
    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id).select("-__v");
    if (!deletedUser) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `the user with id (${id}) is not found.`,
      });
      return;
    }

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      state: "failed",
      stateCode: 500,
      message: `internal error: ${err}`,
    });
  }
};

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber: phoneNumber }).select(
      "-__v"
    );
    if (!user) {
      res.status(404).json({
        state: "failed",
        stateCode: 404,
        message: `this user with phone number (${phoneNumber}) is not exist.`,
      });
      return;
    }
    const isChecked = await bcryprt.compare(password, user.password);
    if (!isChecked) {
      res.status(404).json({
        state: "failed",
        stateCode: 400,
        message: `The password you put is wrrong.`,
      });
      return;
    }

    res.status(200).json({
      state: "success",
      stateCode: 200,
      data: user,
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
  login,
  deleteUser,
  signUp,
  getUsers,
  getUserByPhoneNumber,
};
