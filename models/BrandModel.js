const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "the brand must be unique"],
      trim: true,
      require: [true, "the name is required"],
      maxLength: [32, "too long, the name must be at most 32 characters. "],
      minLength: [3, "too short, the name must be at least 5 characters."],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const Brand = mongoose.model("brands", brandSchema);

module.exports = Brand;
