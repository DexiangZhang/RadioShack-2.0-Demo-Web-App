require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger_docs/swaggerAPI.yaml");

const expressJwt = require("express-jwt");
const fs = require("fs");

// middware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//common api header
const userApi = "/api/user";
const productApi = "/api/product";

const getAllUsers = require("./src/routes/getAllUsers");
const createNewUser = require("./src/routes/createNewUser");
const userLogin = require("./src/routes/userAuthentication");
const getUserProfile = require("./src/routes/getUserProfile");
const updateUserProfile = require("./src/routes/updateUserProfile");
const placeUserOrder = require("./src/routes/placeUserOrder");
const getUserOrders = require("./src/routes/getUserOrders");
const getUserOrderProdInfo = require("./src/routes/getOrderProdInfo");
const getAllUserOrders = require("./src/routes/getAllUserOrders");
const resetUserPassword = require("./src/routes/resetUserPassword");

const getAllProducts = require("./src/routes/getAllProducts");
const createNewProduct = require("./src/routes/createNewProduct");
const deleteProduct = require("./src/routes/deleteProduct");
const updateProductInfo = require("./src/routes/updateProductInfo");

// get public key and decode the key for middleware

// TODO: have error to get the key from the file
const RSA_PUBLIC_KEY = fs.readFile("jwt_keys/publicKey.pem", (err) => {
  console.log(err);
});
const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  algorithms: ["RS256"],
});

// user api
app.get(`${userApi}/fetchAllUsers`, getAllUsers);
app.get(`${userApi}/getAllUserOrders`, getAllUserOrders);

// not testing yet, need to testing
app.get(
  `${userApi}/getUserProfile/:userID`,
  checkIfAuthenticated,
  getUserProfile
);

app.get(`${userApi}/getUserOrders/:userID`, getUserOrders);
app.get(`${userApi}/getUserOrderProduct/:orderNum`, getUserOrderProdInfo);

app.post(`${userApi}/resetPassword`, resetUserPassword);
app.post(`${userApi}/signUp`, createNewUser);
app.post(`${userApi}/signIn`, userLogin);
app.post(`${userApi}/placeOrder/:userID`, placeUserOrder);
app.patch(`${userApi}/updateUserProfile/:userID`, updateUserProfile);

// product api
app.get(`${productApi}/fetchAllProducts`, getAllProducts);
app.post(`${productApi}/uploadNewProduct/:userID`, createNewProduct);
app.delete(`${productApi}/deleteProduct/:prodID`, deleteProduct);
app.patch(`${productApi}/updateProductInfo/:prodID`, updateProductInfo);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
