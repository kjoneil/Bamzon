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
// Connects to mySQL database that stores the products for this app
function start(){
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) throw error;
        for(var i=0; i<response.length;i++){
            console.log("\n"+response[i].id+" | "+response[i].product_name+" | "+response[i].department_name+" | "+response[i].price+" | "+response[i].stock_quantity);
            console.log("---------------------------------");
        }
        bamzon()
    });
}
// Purchasing and updating inventory app. First prompts the user with a series of question about the item/quantity they wish to buy a
function bamzon() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "What is the product ID of the item you wish to purchase?",

        },{
            name: "quantity",
            type: "input",
            message: "How many items would you like?",

        }]).then(function(order) {
        // taking the response 
            connection.query("SELECT * FROM products", function(err, response){
            if(err) throw err;

        var orderedItem;
        for(var i=0; i<response.length;i++){
            if(response[i].id === parseInt(order.itemId)){
                orderedItem = response[i];
            }
        }
        // updating inventory and adding the total of the items purchased
        if(orderedItem.stock_quantity > parseInt(order.quantity)){
            connection.query("UPDATE products SET ? WHERE ?",
                
            [{stock_quantity: (orderedItem.stock_quantity - parseInt(order.quantity))},
             {id: orderedItem.id}],
        function(error){
            if(error) throw error;
            console.log("Thank you! "+" Your total is "+"$"+parseInt(order.quantity)* orderedItem.price);
            console.log("inventory updated!\n");

                }    
            );
        }else {
            console.log("Sorry! Insufficient quantity!");
            }
            connection.end();
        });
    });
};