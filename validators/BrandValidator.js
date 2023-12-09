const { param, validationResult } = require("express-validator");

const mongoIDValidator = param("id")
  .isMongoId()
  .withMessage("The id is not valid. it dosn't have the format of an Mongo id");

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

module.exports = {
  getBrandByIdValidator,
};
