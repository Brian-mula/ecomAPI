const mongoose = require("mongoose");
// cart schema
const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
  },
  { timeStamps: true }
);
const Cart = mongoose.model("cart", CartSchema);
// export the cart
module.exports = Cart;
