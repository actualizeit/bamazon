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
    mainScreen()
  });

function displayItems(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("\n Look at all this sweet stuff!!!")
    for (var i = 0; i < res.length; i++) {
      console.log(
        "\n ID: " + res[i].item_id + 
        " || Product Name: " + res[i].product_name + 
        " || Department Name: " + res[i].department_name + 
        " || Price: " + res[i].price +
        " || Stock Quantity: " + res[i].stock_quantity
      );
    }
    console.log("\n\n\n")
  });
  mainScreen();
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
      if (answer.quantity > res[0].stock_quantity){
        console.log("Ain't anuff of it! Buy somthin else!")
        mainScreen();
      }else{
        // console.log("stock " + res[0].stock_quantity)
        // console.log("buyin " + answer.quantity)
        var stockLeft = res[0].stock_quantity - answer.quantity
        // console.log("stockLeft " + stockLeft)
        var cost = answer.quantity * res[0].price
        console.log("That'll set you back $" + cost + " yo! Betta save them sheckels")
        connection.query("UPDATE products SET ? WHERE ?",
          [{stock_quantity: stockLeft},
          {item_id: answer.id}],
          function(err) {
            if (err) throw err;
          }
        )
        mainScreen();
      }
    })
  })
}

function mainScreen(){
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: ["View Items","Imma buy summin!","Quit"]
    }
]).then(function(res) {
    if(res.choice === "Imma buy summin!") {
        buyItem();
    } else if (res.choice === "View Items") {
      displayItems();
    }else{
      connection.end();
    }
  });
};