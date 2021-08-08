const mongoose = require("mongoose");
// product schemaata
const ProductShema = new mongoose.Schema({});

const Product = mongoose.model("product", ProductShema);
module.exports = Product;
