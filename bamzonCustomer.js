var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamzon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        // Sited from online repository 
        response.forEach(newRow => {
            console.log(`Id: ${newRow.id} Name: ${newRow.product_name} Department: ${newRow.department_name} Price: ${newRow.price} Quantity:${newRow.stock_quantity}`)
        });
        bamzon()
})
}

function bamzon() {
    inquirer.prompt([
        {
            message: "Input the product ID of the item you wish to purchase.",
            type: "input",
            name: "item_id"
        },
        {
            message: "How many items would you like?",
            type: "input",
            name: "item_quantity"
        }
    ])
    // .then(function (order) {
    //     var itemId = order.itemId;
    //     var itemQuantity = order.itemQuantity;
    //     inventory(itemId, itemQuantity)
    // });
}