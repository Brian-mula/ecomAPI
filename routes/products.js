const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const User = require("../models/Users");

// route to add a product
router.post("/create", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(200).json("product created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// route to update the product
router.put("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.userId === req.body.userId) {
      await product.updateOne({ $set: req.body });
      res.status(200).json("product updated successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// route to get all products
router.get("/products/all/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const products = await Product.find({ userId: user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
// route to get single product
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});
// route to delete product

// export the routes
module.exports = router;
