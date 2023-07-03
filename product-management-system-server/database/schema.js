const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  type: { type: String, trim: true, default: "CUSTOMER" },
  status: { type: String, trim: true, default: "SIGNOUT" },
  cart: [
    {
      uuid: String,
      quantity: Number,
    },
  ],
});

const productSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  inStockQuantity: { type: Number, required: true, trim: true },
  imageLink: { type: String, required: true },
  lastModTime: { type: Number, required: true },
  existence: { type: Boolean, required: true },
});

exports.userSchema = userSchema;
exports.productSchema = productSchema;
