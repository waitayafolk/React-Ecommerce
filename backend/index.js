const express = require("express");
const app = express();
const port = 4500;
const conpool = require("./connect/db_connect");
var cors = require("cors");
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const user = require("./router/user");
const groupproduct = require("./router/groupproduct");
const product = require("./router/product");
const order = require("./router/order");


app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static('public'));

app.use("/user", user);
app.use("/groupproduct", groupproduct);
app.use("/product", product);
app.use("/order", order);


app.use(fileUpload());

app.get("/", function (req, res) {
  res.send("Api IService");
});

app.post("/login", function (req, res) {
  conpool.query(
    `SELECT *  FROM tb_admin  WHERE username = (?) AND password = (?) AND status = 'use'`,
    [req.body.username, req.body.password],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        if (result.length > 0) {
          res.json({message: "Login Success"})
        } else {
          res.json({ message: "Login Error" });
        }
      }
    }
  );
});

app.post('/picture_product', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name});
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
