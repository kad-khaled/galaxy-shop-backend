const express = require("express");
const {
  getListProduct,
  getProductById,
  createNewProduct,
  deleteProductById,
  updateProductById,
} = require("../controllers/ProductServices");
const {
  getProductByIdValidator,
  createNewProductValidator,
  deleteProductByIdValidator,
  updateProductByIdValidator,
} = require("../validators/ProductValidator");

const ProductRoutes = express.Router();
ProductRoutes.get("/products", getListProduct);
ProductRoutes.post("/products", createNewProductValidator, createNewProduct);
ProductRoutes.get("/products/:id", getProductByIdValidator, getProductById);
ProductRoutes.delete(
  "/products/:id",
  deleteProductByIdValidator,
  deleteProductById
);
ProductRoutes.put(
  "/products/:id",
  updateProductByIdValidator,
  updateProductById
);

module.exports = ProductRoutes;
