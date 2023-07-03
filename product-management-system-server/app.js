//jshint esversion:6
require("dotenv").config();
const express = require("express");
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

const connectToMongoose = require("./database/connect");
const model = require("./database/model");
connectToMongoose();

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // methods: ["GET", "POST"],
  })
);
// app.use(cookieParser());

// Requests Targeting All Users
app
  .route("/users")

  .get((_, res) => {
    model.User.find({}, (err, foundUsers) => {
      if (!err) {
        res.send(foundUsers);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const newUser = new model.User({
      uuid: req.body.uuid,
      email: req.body.email,
      password: req.body.password,
      status: "SIGNIN",
    });

    newUser.save((err) => {
      if (!err) {
        res.send(newUser);
      } else {
        res.send(err);
      }
    });
  })

  .delete((_, res) => {
    model.User.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all users.");
      } else {
        res.send(err);
      }
    });
  });

// Get A Specific User By Email
app.get("/users/email/:user_email", async (req, res) => {
  console.log("req_params", req.params.user_email);
  model.User.findOne(
    { email: decodeURI(req.params.user_email) },
    (err, foundUser) => {
      console.log(err, foundUser);
      if (!foundUser) {
        res.send({ errorType: "NON_EXISTENT_USER" });
        // res.send("No user matching that email was found.");
      } else if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(foundUser);
      }
    }
  );
});

// Request Targeting A Specific User
app
  .route("/users/:user_uuid")

  .get((req, res) => {
    model.User.findOne(
      { uuid: decodeURI(req.params.user_uuid) },
      (err, foundUser) => {
        if (foundUser) {
          res.send(foundUser);
        } else if (err) {
          res.send(err);
        } else {
          res.send("No user matching that uuid was found.");
        }
      }
    );
  })

  .put((req, res) => {
    model.User.updateOne(
      { uuid: decodeURI(req.params.user_uuid) },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send(req.body);
          // res.send("Successfully updated.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch((req, res) => {
    model.User.updateOne(
      { uuid: decodeURI(req.params.user_uuid) },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Successfully updated.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete((req, res) => {
    model.User.deleteOne({ uuid: decodeURI(req.params.user_uuid) }, (err) => {
      if (!err) {
        res.send("Successfully deleted the corresponding user.");
      } else {
        res.send(err);
      }
    });
  });

// Requests Targeting All Products
app
  .route("/products")

  .get((_, res) => {
    model.Product.find({}, (err, foundProducts) => {
      if (!err) {
        res.send(foundProducts);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const newProduct = new model.Product({
      uuid: req.body.uuid,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      inStockQuantity: req.body.inStockQuantity,
      imageLink: req.body.imageLink,
      lastModTime: req.body.lastModTime,
      existence: req.body.existence,
    });

    newProduct.save((err) => {
      if (!err) {
        res.send("Successfully added a new product.");
      } else {
        res.send(err);
      }
    });
  })

  .delete((_, res) => {
    model.Product.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all products.");
      } else {
        res.send(err);
      }
    });
  });

// Request Targeting A Specific Product
app
  .route("/products/:product_uuid")

  .get((req, res) => {
    model.Product.findOne(
      { uuid: decodeURI(req.params.product_uuid) },
      (err, foundProduct) => {
        if (foundProduct) {
          res.send(foundProduct);
        } else if (err) {
          res.send(err);
        } else {
          res.send({ errorType: "NON_EXISTENT_PRODUCT" });
        }
      }
    );
  })

  .put((req, res) => {
    model.Product.updateOne(
      { uuid: decodeURI(req.params.product_uuid) },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Successfully updated product.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch((req, res) => {
    model.Product.updateOne(
      { uuid: decodeURI(req.params.product_uuid) },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Successfully updated product.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete((req, res) => {
    model.Product.deleteOne(
      { uuid: decodeURI(req.params.product_uuid) },
      (err) => {
        if (!err) {
          res.send("Successfully deleted the corresponding product.");
        } else {
          res.send(err);
        }
      }
    );
  });

// Request Targeting Part of the Products
app.post("/products/page", (req, res) => {
  model.Product.find({})
    .sort(req.body.order)
    .skip(req.body.skip)
    .limit(req.body.limit)
    .then((foundProducts) => {
      if (foundProducts) {
        res.send(foundProducts);
      } else {
        res.send("No products matching that filter was found.");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
// req = { order: { price: -1 }, skip: 10, limit: 5 };

// Get the Total Number of Products
app.get("/productstotalnumber", (_, res) => {
  model.Product.count({ existence: true }, (err, count) => {
    if (!err) {
      res.send(count.toString());
    } else {
      res.send(err);
    }
  });
});

app.listen(3002, () => {
  console.log("Server started on port 3002.");
});
