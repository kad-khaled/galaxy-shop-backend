const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    bareCode: {
      type: String,
      maxLength: [
        13,
        "maximum length of EAN(Europe Article Number) codeBare is 13 characters.",
      ],
      required: [true, "CodeBare filed is required"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
      required: [true, "name field must be not empty."],
      minLength: [5, "too short, the name must be at least 5 characters."],
      maxLength: [128, "too long, the name must be at most 128 characters."],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
    },

    sellingPrice: {
      type: Number,
      required: [true, "selling price field is required."],
      min: 0,
      default: 0,
    },
    priceAfterReduction: {
      type: Number,
      min: 0,
    },
    ratingAvrage: {
      type: Number,
      max: [5, "the rating must be underor or equal 5."],
      min: [0, "the rating must be greater or equal 0."],
      default: 0,
    },
    votersNumber: {
      type: Number,
      min: 0,
      default: 0,
    },
    soldQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    quantityInStock: {
      type: Number,
      min: 0,
      default: 0,
    },

    brandID: {
      type: mongoose.Schema.ObjectId,
      ref: "brands",
    },
    subCategoryID: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Product must be belong to a SubCategory."],
      ref: "subcategories",
    },
    image: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
