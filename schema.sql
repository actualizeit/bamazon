drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
   item_id int not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock_quantity int(10) not null,
    product_sales int(10) not null default 0,
    primary key (item_id)
);

create table departments(
    department_id int not null auto_increment,
    department_name varchar(100) not null,
    over_head_costs int(10) not null,
    primary key (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES  ("Sponges", "I clean!", "3.50", "20", "1000"),
		("Dog Food", "Dog Stuff", "5.00", "15", "1000"),
        ("Brooms", "I clean!", "8.00", "8", "1000"),
        ("Peaches", "Food", "3.00", "30", "1000"),
        ("Cards", "Misc", "1.50", "40", "1000"),
        ("Nerf Gun", "Awesome", "20.00", "4", "1000"),
        ("Soap", "Personal Care", "1.00", "15", "1000"),
        ("Candy", "Food", "0.50", "200", "1000"),
        ("Ping Pong Balls", "Misc", "2.50", "30", "1000");


INSERT INTO departments (department_name, over_head_costs)
VALUES  ("I clean!", "2000"),
        ("Dog Stuff", "500"),
        ("Food", "3000"),
        ("Misc", "750"),
        ("Personal Care", "1500"),
        ("Awesome", "300");

