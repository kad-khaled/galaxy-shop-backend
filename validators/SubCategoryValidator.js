const { param, body } = require("express-validator");
const SubCategory = require("../models/SubCategoryModel");
const Category = require("../models/CategoryModel");
const handelValidationErrors = require("../ErrorHandling");

const deleteSubCategoryByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage(
      "The id is not valid. it dosn't have the format of an Mongo id"
    ),
  handelValidationErrors,
];

const getSubCategoryByIdValidator = [...deleteSubCategoryByIdValidator];

const createNewSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("the name field is required, must be not empty.")
    .isLength({ min: 2 })
    .withMessage("Name is too short. Name must have at least 4 charachters.")
    .isLength({ max: 32 })
    .withMessage("Name is too long. Name must  have at most 32 character.")
    .custom(async (name) => {
      try {
        const subCategory = await SubCategory.findOne({ name });
        if (subCategory) {
          return Promise.reject(
            `the sub-category with name( ${name} ) is already Exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  body("categoryID")
    .notEmpty()
    .withMessage("the categoryID field is required, must be not empty.")
    .isMongoId()
    .withMessage(
      "The category id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const category = await Category.findById({ _id: id });
        if (!category) {
          return Promise.reject(`the category with id( ${id} ) is not Exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  handelValidationErrors,
];

const updateSubCategoryByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage(
      "The id is not valid. it dosn't have the format of an Mongo id"
    ),
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name is too short. Name must have at least 4 charachters.")
    .isLength({ max: 32 })
    .withMessage("Name is too long. Name must  have at most 32 character.")
    .custom(async (name) => {
      try {
        const subCategory = await SubCategory.findOne({ name });
        if (subCategory) {
          return Promise.reject(
            `the sub-category with name( ${name} ) is already Exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  body("categoryID")
    .optional()
    .isMongoId()
    .withMessage(
      "The category id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const category = await Category.findById({ _id: id });
        if (!category) {
          return Promise.reject(`the category with id( ${id} ) is not Exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  handelValidationErrors,
];
module.exports = {
  getSubCategoryByIdValidator,
  deleteSubCategoryByIdValidator,
  createNewSubCategoryValidator,
  updateSubCategoryByIdValidator,
};
