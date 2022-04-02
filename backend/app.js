require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger_docs/swaggerAPI.yaml");

// middware
app.use(bodyParser.urlencoded({ extended: false }));
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

const getAllProducts = require("./src/routes/getAllProducts");
const createNewProduct = require("./src/routes/createNewProduct");

// user api
app.get(`${userApi}/fetchAllUsers`, getAllUsers);
app.get(`${userApi}/getUserProfile/:userID`, getUserProfile);
app.get(`${userApi}/getUserOrders/:userID`, getUserOrders);

app.post(`${userApi}/signUp`, createNewUser);
app.post(`${userApi}/signIn`, userLogin);
app.post(`${userApi}/placeOrder/:userID`, placeUserOrder);
app.patch(`${userApi}/updateUserProfile/:userID`, updateUserProfile);

// product api
app.get(`${productApi}/fetchAllProducts`, getAllProducts);
app.post(`${productApi}/uploadNewProduct`, createNewProduct);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
