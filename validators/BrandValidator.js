const { param, body, validationResult } = require("express-validator");
const Brand = require("../models/BrandModel");
const handelValidationErrors = require("../ErrorHandling");

const mongoIDValidator = param("id")
  .isMongoId()
  .withMessage("The id is not valid. it dosn't have the format of an Mongo id");

const brandNameValidator = body("name")
  .notEmpty()
  .withMessage("the brand name field is require.")
  .isLength({ min: 4 })
  .withMessage("Name is too short. Name must have at least 4 charachters.")
  .isLength({ max: 32 })
  .withMessage("Name is too long. Name must  have at most 32 character.")
  .custom(async (name) => {
    try {
      const brand = await Brand.findOne({ name });
      if (brand) {
        return Promise.reject(
          `the brand with name( ${name} ) is already Exist.`
        );
      }
      return true;
    } catch (err) {
      return Promise.reject(`Internal server error.`);
    }
  });

const getBrandByIdValidator = [mongoIDValidator, handelValidationErrors];
const deleteBrandByIdValidator = [mongoIDValidator, handelValidationErrors];
const CreateNewBrandValidator = [brandNameValidator, handelValidationErrors];
const updateBrandByIdValidator = [
  mongoIDValidator,
  brandNameValidator,
  handelValidationErrors,
];

module.exports = {
  getBrandByIdValidator,
  deleteBrandByIdValidator,
  CreateNewBrandValidator,
  updateBrandByIdValidator,
};
