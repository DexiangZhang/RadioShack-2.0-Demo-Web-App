CREATE TABLE IF NOT EXISTS userAccounts(
  userID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  userPassword VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  homeAddress VARCHAR(50) NOT NULL,
  phoneNum CHAR(10) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS orders(
    orderID SERIAL PRIMARY KEY,
    userID INT,
    custFirstName VARCHAR(50) NOT NULL,
    custLastName VARCHAR(50) NOT NULL,
    custDeliAddress VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES userAccounts(userID)
);

CREATE TABLE IF NOT EXISTS ordersInfo(
    orderNum VARCHAR(255) PRIMARY KEY,
    orderStatus VARCHAR(50) NOT NULL,
    totalPrice INT NOT NULL,
    orderID INT,
    FOREIGN KEY (orderID) REFERENCES orders(orderID)
);

CREATE TABLE IF NOT EXISTS products(
    productID INT PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    quality INT NOT NULL,
    descriptions VARCHAR(50) NOT NULL,
    unitPrice INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orderProducts(
    totalPriceItem INT NOT NULL,
    productID INT,
    orderNum VARCHAR(255),
    FOREIGN KEY (orderNum) REFERENCES ordersInfo(orderNum),
    FOREIGN KEY (productID) REFERENCES products(productID)
);

