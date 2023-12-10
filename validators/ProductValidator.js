const { param, body } = require("express-validator");
const Brand = require("../models/BrandModel");
const SubCategory = require("../models/SubCategoryModel");
const handelValidationErrors = require("../ErrorHandling");
const Product = require("../models/ProductModel");

const deleteProductByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage(
      "The id is not valid. it dosn't have the format of an Mongo id"
    ),
  handelValidationErrors,
];

const getProductByIdValidator = [...deleteProductByIdValidator];

const createNewProductValidator = [
  body("bareCode")
    .notEmpty()
    .withMessage("The barCode field is required, must be not empty.")
    .isLength({ max: 13 })
    .withMessage(
      "BareCode is too long. BardeCode must  have at most 13 character."
    )
    .custom(async (bareCode) => {
      try {
        const product = await Product.findOne({ bareCode });
        if (product) {
          return Promise.reject(
            `This bareCode ( ${bareCode} ) is already exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),

  body("name")
    .notEmpty()
    .withMessage("the name field is required, must be not empty.")
    .isLength({ max: 128 })
    .withMessage(
      "The Nmae is too long. BardeCode must  have at most 128 character."
    )
    .isLength({ min: 5 })
    .withMessage(
      "The Nmae is too short. The name must  have at least 5 character."
    )
    .custom(async (name) => {
      try {
        const product = await Product.findOne({ name });
        if (product) {
          return Promise.reject(`This name ( ${name} ) is already exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),

  body("slug").optional(),
  body("description").optional(),
  body("sellingPrice")
    .notEmpty()
    .withMessage("the sellingPrice field is required.")
    .isFloat({ min: 0 })
    .withMessage("The sellingPrice must be a positive."),
  body("priceAfterReduction")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The sellingPrice must be a positive."),
  body("ratingAvrage")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("the rating must be between 0 and  5."),
  body("votersNumber")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The votersNumber must be positive."),
  body("soldQuantity")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The soldQuantity must be positive."),
  body("quantityInStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The quantityInStock must be positive."),

  body("subCategoryID")
    .notEmpty()
    .withMessage("the subCategoryID field is required, must be not empty.")
    .isMongoId()
    .withMessage(
      "The subCategory id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const subCategory = await SubCategory.findById({ _id: id });
        if (!subCategory) {
          return Promise.reject(
            `the subCategory with id( ${id} ) is not Exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  body("brandID")
    .notEmpty()
    .withMessage("the brandID field is required, must be not empty.")
    .isMongoId()
    .withMessage(
      "The brandID id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const brand = await Brand.findById({ _id: id });
        if (!brand) {
          return Promise.reject(`the brand with id( ${id} ) is not Exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  handelValidationErrors,
];

const updateProductByIdValidator = [
  param("id")
    .isMongoId()
    .withMessage(
      "The id is not valid. it dosn't have the format of an Mongo id"
    ),
  body("bareCode")
    .optional()
    .isLength({ max: 13 })
    .withMessage(
      "BareCode is too long. BardeCode must  have at most 13 character."
    )
    .custom(async (bareCode) => {
      try {
        const product = await Product.findOne({ bareCode });
        if (product) {
          return Promise.reject(
            `This bareCode ( ${bareCode} ) is already exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),

  body("name")
    .optional()
    .isLength({ max: 128 })
    .withMessage(
      "The Nmae is too long. BardeCode must  have at most 128 character."
    )
    .isLength({ min: 5 })
    .withMessage(
      "The Nmae is too short. The name must  have at least 5 character."
    )
    .custom(async (name) => {
      try {
        const product = await Product.findOne({ name });
        if (product) {
          return Promise.reject(`This name ( ${name} ) is already exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),

  body("slug").optional(),
  body("description").optional(),
  body("sellingPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The sellingPrice must be a positive."),
  body("priceAfterReduction")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The sellingPrice must be a positive."),
  body("ratingAvrage")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("the rating must be between 0 and  5."),
  body("votersNumber")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The votersNumber must be positive."),
  body("soldQuantity")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The soldQuantity must be positive."),
  body("quantityInStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("The quantityInStock must be positive."),

  body("subCategoryID")
    .optional()
    .isMongoId()
    .withMessage(
      "The subCategory id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const subCategory = await SubCategory.findById({ _id: id });
        if (!subCategory) {
          return Promise.reject(
            `the subCategory with id( ${id} ) is not Exist.`
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  body("brandID")
    .optional()
    .isMongoId()
    .withMessage(
      "The brandID id is not valid. it dosn't have the format of an Mongo id"
    )
    .custom(async (id) => {
      try {
        const brand = await Brand.findById({ _id: id });
        if (!brand) {
          return Promise.reject(`the brand with id( ${id} ) is not Exist.`);
        }
        return true;
      } catch (err) {
        return Promise.reject(`Internal server error. ${err}`);
      }
    }),
  handelValidationErrors,
];
module.exports = {
  getProductByIdValidator,
  deleteProductByIdValidator,
  createNewProductValidator,
  updateProductByIdValidator,
};
