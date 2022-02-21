var express = require("express");
var router = express.Router();
const conpool = require("../connect/db_connect");

router.get("/", function (req, res) {
  conpool.query(
    `SELECT * FROM tb_product  WHERE status != 'delete' ORDER BY id ASC`,
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
      `INSERT INTO tb_product(product_code, product_name, product_price , discount , group_product_id , product_detail , image , status )
      VALUES((?), (?), (?), (?), (?), (?), (?),'use') `,
      [req.body.product_code, req.body.product_name, req.body.product_price, req.body.discount, req.body.group_product_id, req.body.product_detail, req.body.image],
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
      `UPDATE tb_product SET product_code = (?), product_name = (?), product_price =  (?), discount = (?) , group_product_id = (?) , product_detail = (?) , image = (?)
      WHERE id = (?)`,
      [req.body.product_code, req.body.product_name, req.body.product_price, req.body.discount, req.body.group_product_id, req.body.product_detail, req.body.image , req.body.id],
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
      `UPDATE tb_product SET status = "delete" WHERE id = (?)`,
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
