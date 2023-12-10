const express = require("express");
const {
  createNewSubCategoryValidator,
  getSubCategoryByIdValidator,
  deleteSubCategoryByIdValidator,
  updateSubCategoryByIdValidator,
} = require("../validators/SubCategoryValidator");
const {
  getListSubCategories,
  createNewSubCategory,
  getSubCategoryById,
  deleteSubCategoryById,
  updateSubCategoryById,
} = require("../controllers/SubCategoryServices");

const SubCategorydRoutes = express.Router();
SubCategorydRoutes.get("/sub-categories", getListSubCategories);
SubCategorydRoutes.post(
  "/sub-categories",
  createNewSubCategoryValidator,
  createNewSubCategory
);
SubCategorydRoutes.get(
  "/sub-categories/:id",
  getSubCategoryByIdValidator,
  getSubCategoryById
);
SubCategorydRoutes.delete(
  "/sub-categories/:id",
  deleteSubCategoryByIdValidator,
  deleteSubCategoryById
);

SubCategorydRoutes.put(
  "/sub-categories/:id",
  updateSubCategoryByIdValidator,
  updateSubCategoryById
);

module.exports = SubCategorydRoutes;
