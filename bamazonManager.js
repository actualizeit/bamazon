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

  function mainScreen(){
    inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Quit"]
      }
  ]).then(function(res) {
      if(res.choice === "View Products for Sale") {
        displayItems();
      } else if (res.choice === "View Low Inventory") {
        lowInv();
      }else if (res.choice === "Add to Inventory") {
        addInv();
      }else if (res.choice === "Add New Product") {
        addProd();
      }else{
        connection.end();
      }
    });
  };

function displayItems(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "\n ID: " + res[i].item_id + 
        " || Product Name: " + res[i].product_name + 
        " || Department Name: " + res[i].department_name + 
        " || Price: " + res[i].price +
        " || Stock Quantity: " + res[i].stock_quantity
      );
    }
    console.log("\n")
    mainScreen();
  });
};

function lowInv(){
    connection.query("select * from products where stock_quantity < 5", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "\n ID: " + res[i].item_id + 
                " || Product Name: " + res[i].product_name + 
                " || Department Name: " + res[i].department_name + 
                " || Price: " + res[i].price +
                " || Stock Quantity: " + res[i].stock_quantity
            );
        }
        console.log("\n")
        mainScreen();
    })

}
  
function addInv(){
    inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the item you would like to buy stock for?",
        },
        {
            type: "input",
            name: "quantity",
            message: "How many additional units?"
        }
    ]).then(function(ans) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity + " + ans.quantity + " WHERE ?",
          {item_id: ans.id},
          function(err) {
            if (err) throw err;
            console.log("\nStock level adjusted! " + ans.quantity + " units added. Thanks boss!")
            console.log("\n")
            mainScreen();
          }
        )
    })
}

function addProd() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the product you'd like to add?",
        },
        {
            type: "input",
            name: "dept",
            message: "What department does it go in?",
          },
        {
          type: "input",
          name: "cost",
          message: "What is its cost?",
        },
        {
            type: "input",
            name: "quantity",
            message: "How many will you stock?",
          }
      ]).then(function(ans) {
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: ans.name,
        department_name: ans.dept,
        price: ans.cost,
        stock_quantity: ans.quantity
      },
      function(err, res) {
        if (err) throw err;
        console.log("\n" + 
        res.affectedRows + " product inserted!\n");
        mainScreen();
      }
    );
  })
}