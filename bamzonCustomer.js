// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
// Connection details for database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamzon_db"
});
// Runs the 'start' function once connection is made
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        //  creates a new row for each row of data from the response.
        response.forEach(newRow => {
            console.log(`Id: ${newRow.id} Name: ${newRow.product_name} Department: ${newRow.department_name} Price: ${newRow.price} Quantity:${newRow.stock_quantity}`)
        });
        bamzon()
})
}

function bamzon() {
    inquirer.prompt([
        {
            message: "What is the product ID of the item you wish to purchase?",
            type: "input",
            name: "item_id"
        },
        {
            message: "How many items would you like?",
            type: "input",
            name: "item_quantity"
        }
    ])
    .then(function (order) {
        var itemId = order.itemId;
        var itemQuantity = order.itemQuantity;
        updateInventory(itemId, itemQuantity)
    });
}

function updateInventory(){
    console.log("updating the stuff");
    var newStock = products.stock_quantity - itemQuantity;
    var query = connection.query("UPDATE products SET ? WHERE ?",
    
    [{
        stock_quantity: newStock
    },
    {
        id: itemId
    }
],
function(err, response){
    console.log(response.affectedRows + "products updated!\n");
    // readProducts();
}
)
    console.log(query.sql);
    
}
// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.log(response);
//       connection.end();
//     });
//   }