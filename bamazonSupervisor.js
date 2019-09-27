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
        "SELECT departments.department_id, departments.over_head_costs, departments.department_name, COALESCE(SUM(products.product_sales), 0) AS department_sales " +
        "FROM products " +
        "RIGHT JOIN departments " +
        "ON products.department_name = departments.department_name " +
        "GROUP BY department_id",
    function(err, res) {
        if (err) throw err;
        for(i=0; i < res.length; i++){
          res[i].profit = res[i].department_sales - res[i].over_head_costs;
        }
        console.log(res);
        makeTable(res);
        mainScreen();
    })
  }
function makeTable(res){
  var Table = require('cli-table');
  var table = new Table({
      head: ['department_id', 'department_name', 'over_head_costs', 'department_sales', 'total_profit'],
      colWidths: [20, 20, 20, 20, 20]
  });
  for (var i = 0; i < res.length; i++) {
  table.push(
    [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].department_sales, res[i].profit]
  ); 
  }
  console.log(table.toString());
}

function createDept(){
  inquirer.prompt([
    {
      type: "input",
      name: "deptname",
      message: "What is the name of the department you'd like to create?",
    },
    {
      type: "input",
      name: "overhead",
      message: "What's the overhead cost of the department?",
    }
]).then(function(ans) {
  console.log(ans)
  var query = connection.query(
    "INSERT INTO departments SET ?",
    {
      department_name: ans.deptname,
      over_head_costs: ans.overhead
    },
    function(err, res) {
      if (err) throw err;
      console.log("\n" + 
      res.affectedRows + " department created!\n");
      mainScreen();
    }
  )
})
};