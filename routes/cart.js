const express = require("express");
const router = express.Router();
// import cart model
const Cart = require("../models/Cart");
// import user model
const User = require("../models/Users");
// import product model
const Product = require("../models/Products");

// create cart
router.post("/create", async (req, res) => {
  const cart = new Cart(req.body);
  try {
    await cart.save();
    res.status(200).json("cart created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get the cart

router.get("/cart/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  try {
    const cart = await Cart.find({ userid: user._id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete cart items
router.delete("/cart/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  try {
    if (cart.productId === req.body.productId) {
      await cart.deleteOne();
      res.status(200).json("product deleted from cart successfully");
    } else {
      res.status(404).json("the product cannot be found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete the entire cart
router.delete("/cart/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  try {
    if (cart.userId === req.body.userId) {
      await cart.deleteOne();
      res.status(200).json("cart items deleted successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
