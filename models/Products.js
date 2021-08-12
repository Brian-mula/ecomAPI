const mongoose = require("mongoose");
// product schemaata
const ProductShema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      max: 20,
    },
    category: {
      type: String,
      require: true,
    },
    subcategory: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    disc: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductShema);
module.exports = Product;
