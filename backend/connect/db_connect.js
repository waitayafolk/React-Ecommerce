var mysql = require("mysql");

global.conpool = mysql.createPool({
  connectionLimit: 30,
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce"
});

module.exports = conpool;