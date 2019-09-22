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
    displayItems()
  });

function displayItems(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + 
                " || Product Name: " + res[i].product_name + 
                " || Department Name: " + res[i].department_name + 
                " || Price: " + res[i].price +
                " || Stock Quantity: " + res[i].stock_quantity
                );
    }
  });
  buyItem();
};
function buyItem(){
  inquirer.prompt([
    {
        type: "input",
        name: "id",
        message: "What is the ID of the item you would like to buy?",
    },
    {
      type: "input",
      name: "quantity",
      message: "What quantity of that item would you like to buy?",
    }
  ]).then(function(answer) {
    var query = "select * from products where ?"
    connection.query(query, {item_id: answer.id}, function(err, res) {
      if (err) throw err;
      if (answer.quantity < res.stock_quantity){
        console.log("Ain't anuff of it!")
      }else{
        stockLeft = res.stock_quantity - answer.quantity
        console.log("That set you back $" + answer.quantity * res.price + "yo! Betta save them sheckels")
        connection.query("UPDATE products SET ? WHERE ?",
          [{item_id: answer.id},
          {stock_quantity: stockLeft}], 
          function(err) {
            if (err) throw err;
          }
        )
      }
    })
    displayItems()
  })
}

// connection.query("select res.id from products where price < 3", function(err, res) {
//   if(err) throw err;
//   console.log(JSON.stringify(res, null, 2));
// })