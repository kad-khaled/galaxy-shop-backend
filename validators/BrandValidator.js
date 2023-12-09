const { param, body, validationResult } = require("express-validator");
const Brand = require("../models/BrandModel");

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

const getBrandByIdValidator = [mongoIDValidator, handelErrors];
const deleteBrandByIdValidator = [mongoIDValidator, handelErrors];
const CreateNewBrandValidator = [brandNameValidator, handelErrors];
const updateBrandByIdValidator = [
  mongoIDValidator,
  brandNameValidator,
  handelErrors,
];

module.exports = {
  getBrandByIdValidator,
  deleteBrandByIdValidator,
  CreateNewBrandValidator,
  updateBrandByIdValidator,
};
