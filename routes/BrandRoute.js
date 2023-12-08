const express = require("express");

const Brandroutes = express.Router();
Brandroutes.get("/brands", (req, res) => {
  res.json("return list of brands");
});
Brandroutes.post("/brands", (req, res) => {
  res.json("create a new brand");
});
Brandroutes.get("/brands/:id", (req, res) => {
  res.json("return the brand with the specific id");
});

Brandroutes.delete("/brands/:id", (req, res) => {
  res.json("delete the brand with the specific id");
});

Brandroutes.put("/brands/:id", (req, res) => {
  res.json("update the breand with the specific id");
});
module.exports = Brandroutes;