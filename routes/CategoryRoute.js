const express = require("express");

const {
  getListCategory,
  createNewCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/CategoryServices");
const {
  CreateNewCategoryValidator,
  getCategoryByIdValidator,
  deleteCategoryByIdValidator,
  updateCategoryByIdValidator,
} = require("../validators/CategoryValidator");

const CategoryRoutes = express.Router();
CategoryRoutes.get("/categories", getListCategory);
CategoryRoutes.post(
  "/categories",
  CreateNewCategoryValidator,
  createNewCategory
);
CategoryRoutes.get(
  "/categories/:id",
  getCategoryByIdValidator,
  getCategoryById
);
CategoryRoutes.delete(
  "/categories/:id",
  deleteCategoryByIdValidator,
  deleteCategoryById
);
CategoryRoutes.put(
  "/categories/:id",
  updateCategoryByIdValidator,
  updateCategoryById
);

module.exports = CategoryRoutes;
