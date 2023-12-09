const { param, body, validationResult } = require("express-validator");
const Category = require("../models/CategoryModel");

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

const handelErrors = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    res.status(400).json({
      state: "faild",
      stateCode: 400,
      message: results.array().map((r) => r.msg)[0],
    });
    return;
  }
  next();
};

const getCategoryByIdValidator = [mongoIDValidator, handelErrors];
const deleteCategoryByIdValidator = [mongoIDValidator, handelErrors];
const CreateNewCategoryValidator = [categoryNameValidator, handelErrors];
const updateCategoryByIdValidator = [
  mongoIDValidator,
  categoryNameValidator,
  handelErrors,
];

module.exports = {
  getCategoryByIdValidator,
  deleteCategoryByIdValidator,
  CreateNewCategoryValidator,
  updateCategoryByIdValidator,
};
