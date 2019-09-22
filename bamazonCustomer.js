var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "12345678",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });

function displayItems(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product Name: " + res[i].product_name + 
                " || Department Name: " + res[i].department_name + 
                " || Price: " + res[i].price +
                " || Stock Quantity: " + res[i].stock_quantity
                );
    }
  });
};