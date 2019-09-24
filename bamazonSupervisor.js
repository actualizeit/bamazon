var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
        choices: ["View Product Sales by Department","Create New Department","Quit"]
      }
  ]).then(function(res) {
      if(res.choice === "View Product Sales by Department") {
        prodSales();
      } else if (res.choice === "Create New Department") {
        createDept();
      }else{
        connection.end();
      }
    });
  };

  function prodSales(){
    connection.query(
        "SELECT p.department_name, SUM(p.product_sales) AS product_sales " +
        "FROM (SELECT * FROM products GROUP BY p.department_name) p " +
        "LEFT JOIN departments",
        // "ON d.department_name = p.department_name",
    function(err, res) {
        if (err) throw err;
        console.log(res);
        makeTable(res);
    })

  }
function makeTable(res){
  var Table = require('cli-table');
  var table = new Table({
      head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
      colWidths: [20, 20, 20, 20, 20]
  });
//   for (var i = 0; i < res.length; i++) {
//   table.push(
  []
//   ); 
//   }
  console.log(table.toString());
}