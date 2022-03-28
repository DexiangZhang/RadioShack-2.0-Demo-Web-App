CREATE TABLE IF NOT EXISTS user_accounts(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  user_password VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  home_address VARCHAR(50) NOT NULL,
  phone_num CHAR(10) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    product_id VARCHAR(50) PRIMARY KEY,
    product_image VARCHAR(50) NOT NULL,
    product_name VARCHAR(50) UNIQUE NOT NULL,
    quality INT NOT NULL,
    descriptions VARCHAR(50) UNIQUE NOT NULL,
    unit_price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    user_id INT,
    cust_first_name VARCHAR(50) NOT NULL,
    cust_last_name VARCHAR(50) NOT NULL,
    cust_deli_address VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
);

CREATE TABLE IF NOT EXISTS orders_info(
    order_num VARCHAR(255) PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    total_price INT NOT NULL,
    order_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS order_products(
    total_price_item INT NOT NULL,
    product_id VARCHAR,
    order_num VARCHAR(255),
    FOREIGN KEY (order_num) REFERENCES orders_info(order_num),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

