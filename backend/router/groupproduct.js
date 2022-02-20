var express = require("express");
var router = express.Router();
const conpool = require("../connect/db_connect");

router.get("/", function (req, res) {
    conpool.query(
      `SELECT * FROM tb_group_product  WHERE status != 'delete' ORDER BY id ASC`,
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
        `INSERT INTO tb_group_product(group_code, group_product_name, group_product_name_eng , detail , status )
        VALUES((?), (?), (?), (?), 'use') `,
        [req.body.group_code, req.body.group_product_name, req.body.group_product_name_eng, req.body.detail],
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
        `UPDATE tb_group_product SET group_code = (?), group_product_name = (?), group_product_name_eng =  (?), detail = (?) 
        WHERE id = (?)`,
        [req.body.group_code, req.body.group_product_name, req.body.group_product_name_eng, req.body.detail , req.body.id],
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
      `UPDATE tb_group_product SET status = "delete" WHERE id = (?)`,
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