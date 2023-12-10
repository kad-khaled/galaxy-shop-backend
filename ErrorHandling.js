const { validationResult } = require("express-validator");

const handelValidationErrors = (req, res, next) => {
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
module.exports = handelValidationErrors;
