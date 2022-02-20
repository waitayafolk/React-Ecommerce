var express = require("express");
var router = express.Router();
const conpool = require("../connect/db_connect");

router.get("/", function (req, res) {
  conpool.query(
    `SELECT * FROM tb_admin  WHERE status != 'delete' ORDER BY id ASC`,
    [],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/save", function (req, res) {
  if (req.body.id == 0) {
    conpool.query(
      `INSERT INTO tb_admin(user_code, name, username , password , status )
      VALUES((?), (?), (?), (?), 'use') `,
      [req.body.user_code, req.body.name, req.body.username, req.body.password],
      async (err, result) => {
        if (err) {
          throw Error(err);
        } else {
          res.json({ status: `success` });
        }
      }
    );
  } else {
    conpool.query(
      `UPDATE tb_admin SET user_code = (?), name = (?), username =  (?), password = (?) 
      WHERE id = (?)`,
      [req.body.user_code, req.body.name, req.body.username, req.body.password , req.body.id],
      async (err, result) => {
        if (err) {
          throw Error(err);
        } else {
          res.json({ status: `success` });
        }
      }
    );
  }
});

router.get("/delete/:id", function (req, res) {
  conpool.query(
    `UPDATE tb_admin SET status = "delete" WHERE id = (?)`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        res.json({ status: `success` });
      }
    }
  );
});

module.exports = router;
