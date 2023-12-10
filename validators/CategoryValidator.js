const { param, body, validationResult } = require("express-validator");
const Category = require("../models/CategoryModel");
const handelValidationErrors = require("../ErrorHandling");

const mongoIDValidator = param("id")
  .isMongoId()
  .withMessage("The id is not valid. it dosn't have the format of an Mongo id");

const categoryNameValidator = body("name")
  .notEmpty()
  .withMessage("the category name field is require.")
  .isLength({ min: 3 })
  .withMessage("Name is too short. Name must have at least 4 charachters.")
  .isLength({ max: 32 })
  .withMessage("Name is too long. Name must  have at most 32 character.")
  .custom(async (name) => {
    try {
      const category = await Category.findOne({ name });
      if (category) {
        return Promise.reject(
          `the category with name( ${name} ) is already Exist.`
        );
      }
      return true;
    } catch (err) {
      return Promise.reject(`Internal server error.`);
    }
  });

const getCategoryByIdValidator = [mongoIDValidator, handelValidationErrors];
const deleteCategoryByIdValidator = [mongoIDValidator, handelValidationErrors];
const CreateNewCategoryValidator = [
  categoryNameValidator,
  handelValidationErrors,
];
const updateCategoryByIdValidator = [
  mongoIDValidator,
  categoryNameValidator,
  handelValidationErrors,
];

module.exports = {
  getCategoryByIdValidator,
  deleteCategoryByIdValidator,
  CreateNewCategoryValidator,
  updateCategoryByIdValidator,
};
