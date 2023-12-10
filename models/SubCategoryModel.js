const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "the name is required"],
      unique: [true, "the name of subCategory must be unique."],
      maxLength: [32, "too long, the name must be at most 32 characters."],
      minLength: [2, "too short, the name must be at least 2 characters."],
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "the subCategory must belonge to a category."],
      ref: "categories",
    },
    slug: { type: String, lowercase: true },
    image: String,
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("subcategories", subCategorySchema);

module.exports = SubCategory;
