var express = require("express");
var router = express.Router();
const conpool = require("../connect/db_connect");

router.post("/confirmOrder", function (req, res) {
    conpool.query(
        `INSERT INTO sale_online(name, address, tel , status)
        VALUES((?), (?), (?), 'use') `,
        [req.body.customer_name, req.body.customer_address, req.body.customer_tel],
        async (err, result) => {
          if (err) {
            throw Error(err);
          } else {
              let order_id = result.insertId
              let query = `INSERT INTO sale_online_detail(product_id, qty , product_price , sale_online_id)  VALUES(?)`;
                    for (const item of req.body.product) {
                        await conpool.query(query, [
                            [
                                item.id , 
                                item.qty , 
                                item.price,
                                order_id
                            ]
                        ]);
                    }
            res.json({message :'success'})
          }
        }
      );
    // conpool.query(
    //   `UPDATE tb_product SET status = "delete" WHERE id = (?)`,
    //   [req.params.id],
    //   async (err, result) => {
    //     if (err) {
    //       throw Error(err);
    //     } else {
    //       res.json({ status: `success` });
    //     }
    //   }
    // );
  });

module.exports = router;