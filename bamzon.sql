drop database if exists bamzon_db;
create database bamzon_db;

use bamzon_db;

create table products (
id integer(15) auto_increment not null,
product_name varchar(30) not null,
department_name varchar(45) null,
price decimal(10,2),
stock_quantity int null,
primary key(id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Socks", "Cloths", 4.50, 100),("Pants", "Cloths", 45.00, 30), ("Shirts", "Cloths", 25.00, 50),
("Hats", "Cloths", 15.00, 25),("Wallet", "Accessories", 15.75, 10),("Clutch", "Accessories", 22.50, 10),
("Jacket", "Outerwear", 75.00, 16),("Coat", "Outerwear", 92.99, 12),("Watch", "Accessories", 35.75, 15),
("Umbrella", "Accessories", 65.00, 10);

select * from products;