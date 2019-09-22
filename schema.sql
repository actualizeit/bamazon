drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
   item_id int not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock_quantity int not null,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sponges", "I clean!", "3.50", "20"),
		("Dog Food", "Dog Stuff", "5.00", "15"),
        ("Brooms", "I clean!", "8.00", "8")