var express = require("express");
var router = express.Router();
const conpool = require("../connect/db_connect");

router.get("/", function (req, res) {
  conpool.query(
    `SELECT * FROM sale_online  WHERE status != 'delete' ORDER BY id ASC`,
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

router.post("/confirmOrder", function (req, res) {
  conpool.query(
    `INSERT INTO sale_online(name, address, tel , status)
        VALUES((?), (?), (?), 'use') `,
    [req.body.customer_name, req.body.customer_address, req.body.customer_tel],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        let order_id = result.insertId;
        let query = `INSERT INTO sale_online_detail(product_id, qty , product_price , sale_online_id)  VALUES(?)`;
        for (const item of req.body.product) {
          await conpool.query(query, [
            [item.id, item.qty, item.price, order_id],
          ]);
        }
        res.json({ message: "success" });
      }
    }
  );
});

router.get("/updatestatus/:id/:status", function (req, res) {
  conpool.query(
    `UPDATE sale_online SET status = (?) WHERE id = (?)`,
    [req.params.status , req.params.id],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        res.json({ status: `success` });
      }
    }
  );
});

router.get("/orderdetail/:id", function (req, res) {
  // console.log(req.params)
  conpool.query(
    `SELECT sale_online_detail.* , tb_product.product_name ,tb_product.image
    FROM sale_online_detail 
    LEFT JOIN tb_product on tb_product.id = sale_online_detail.product_id
    WHERE sale_online_detail.sale_online_id = (?)`,
    [req.params.id],
    async (err, result) => {
      if (err) {
        throw Error(err);
      } else {
        res.json(result);
      }
    }
  );
});



module.exports = router;
