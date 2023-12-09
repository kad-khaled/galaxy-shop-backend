const express = require("express");
const {
  getListBrand,
  getBrandById,
  createNewBrand,
  deleteBrandById,
  updateBrandById,
} = require("../controllers/BrandServices");
const {
  getBrandByIdValidator,
  CreateNewBrandValidator,
  deleteBrandByIdValidator,
  updateBrandByIdValidator,
} = require("../validators/BrandValidator");

const Brandroutes = express.Router();
Brandroutes.get("/brands", getListBrand);
Brandroutes.post("/brands", CreateNewBrandValidator, createNewBrand);
Brandroutes.get("/brands/:id", getBrandByIdValidator, getBrandById);
Brandroutes.delete("/brands/:id", deleteBrandByIdValidator, deleteBrandById);
Brandroutes.put("/brands/:id", updateBrandByIdValidator, updateBrandById);

module.exports = Brandroutes;
