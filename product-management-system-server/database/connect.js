const mongoose = require("mongoose");

const connectionStr = "mongodb://127.0.0.1:27017/productDB";

const connectToMongoose = () => {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.once("open", () => {
    console.log("We are connected!");
  });
};

module.exports = connectToMongoose;
