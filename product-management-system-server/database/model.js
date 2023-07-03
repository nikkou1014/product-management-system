const mongoose = require("mongoose");
const schema = require("./schema");

const User = mongoose.model("User", schema.userSchema);
const Product = mongoose.model("Product", schema.productSchema);

exports.User = User;
exports.Product = Product;
