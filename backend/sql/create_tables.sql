CREATE TABLE IF NOT EXISTS user_accounts(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  home_address VARCHAR(50) NOT NULL,
  phone_num CHAR(10) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    product_id VARCHAR(255) PRIMARY KEY,
    product_image VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) UNIQUE NOT NULL,
    quality INT NOT NULL,
    descriptions VARCHAR(65535) UNIQUE NOT NULL,
    unit_price INT NOT NULL,
    product_status VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
);

CREATE TABLE IF NOT EXISTS orders(
    order_num VARCHAR(255) PRIMARY KEY,
    order_status VARCHAR(50) NOT NULL,
    order_date VARCHAR(50) NOT NULL,
    total_price INT NOT NULL,
    cust_first_name VARCHAR(50) NOT NULL,
    cust_last_name VARCHAR(50) NOT NULL,
    cust_deli_address VARCHAR(50) NOT NULL,
    cust_contact_num CHAR(10) UNIQUE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
);


CREATE TABLE IF NOT EXISTS order_products(
    total_price_product INT NOT NULL,
    product_quality INT NOT NULL,
    unit_price INT NOT NULL,
    product_title VARCHAR(255) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    order_num VARCHAR(255),
    product_category VARCHAR(255) NOT NULL,
    product_id VARCHAR(255),
    FOREIGN KEY (order_num) REFERENCES orders(order_num),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

