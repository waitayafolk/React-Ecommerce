const express = require("express");
const app = express();
const port = 4500;
const conpool = require("./connect/db_connect");
var cors = require("cors");
var bodyParser = require("body-parser");

const user = require("./router/user");
const groupproduct = require("./router/groupproduct");


app.use(bodyParser.json());
app.use(cors());

app.use("/user", user);
app.use("/groupproduct", groupproduct);

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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
