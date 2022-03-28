require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// middware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//common api header
const userApi = "/api/user";
const productApi = "/api/product";

const getAllUsers = require("./src/routes/getAllUsers");
const createNewUser = require("./src/routes/createNewUser");
const userLogin = require("./src/routes/userAuthentication");

const getAllProducts = require("./src/routes/getAllProducts");
const createNewProduct = require("./src/routes/createNewProduct");

// user api
app.get(`${userApi}/fetchAllUsers`, getAllUsers);
app.post(`${userApi}/signUp`, createNewUser);
app.post(`${userApi}/signIn`, userLogin);

// product api
app.get(`${productApi}/fetchAllProducts`, getAllProducts);
app.post(`${productApi}/uploadNewProduct`, createNewProduct);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
