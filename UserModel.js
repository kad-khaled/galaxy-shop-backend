const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, " firstName is required."],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, " firstName is required."],
      uppercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "The email already exists, and it should be unique."],
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: [
        true,
        "The phone number already exists, and it should be unique.",
      ],
      required: [true, "Phone number is required."],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "The password is required"],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  },
  {
    timestamps: true,
  }
);

const addSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, "The street field is required"],
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "The city field is required"],
      lowercase: true,
    },
    state: {
      type: String,
      required: [true, "The state field is required"],
      lowercase: true,
    },
    postalCode: {
      type: Number,
      required: [true, "The state field is required"],
      lowercase: true,
    },
    latitude: Number,
    longitude: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
const Address = mongoose.model("addresses", addSchema);

module.exports = {
  User,
  Address,
};
