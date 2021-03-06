const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
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
// order model
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
