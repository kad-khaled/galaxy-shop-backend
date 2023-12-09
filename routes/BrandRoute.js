const express = require("express");
const { getListBrand, getBrandById } = require("../controllers/BrandServices");
const { getBrandByIdValidator } = require("../validators/BrandValidator");

const Brandroutes = express.Router();
Brandroutes.get("/brands", getListBrand);
Brandroutes.post("/brands", (req, res) => {
  res.json("create a new brand");
});
Brandroutes.get("/brands/:id", getBrandByIdValidator, getBrandById);

Brandroutes.delete("/brands/:id", (req, res) => {
  res.json("delete the brand with the specific id");
});

Brandroutes.put("/brands/:id", (req, res) => {
  res.json("update the breand with the specific id");
});
module.exports = Brandroutes;
