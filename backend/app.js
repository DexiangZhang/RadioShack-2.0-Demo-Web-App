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

// check each api request if token is valid or not and if valid then check if it is expoired token
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    // only following api will not be checked for token authorization
    path: [
      "/api/user/signUp",
      "/api/user/signIn",
      "/api/user/resetPassword",
      "/api/product/fetchAllProducts",
    ],
  })
);

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

// get public key and decode the key for middleware to verify the token for RSA256, but cannot get the public key
// since it always run first which get the old key, not the one currently create

// const RSA_PUBLIC_KEY = fs.readFileSync("jwt_keys/publicKey.pem", "utf8");
// const checkIfAuthenticated = expressJwt({
//   secret: RSA_PUBLIC_KEY,
//   algorithms: ["RS256"],
// });

// user api
app.get(`${userApi}/fetchAllUsers`, getAllUsers);
app.get(`${userApi}/getAllUserOrders`, getAllUserOrders);

// change
app.get(`${userApi}/getUserProfile`, getUserProfile);
// change
app.get(`${userApi}/getUserOrders`, getUserOrders);

app.get(`${userApi}/getUserOrderProduct/:orderNum`, getUserOrderProdInfo);

app.post(`${userApi}/resetPassword`, resetUserPassword); // no need to check if authenticated
app.post(`${userApi}/signUp`, createNewUser); // no need to check if authenticated
app.post(`${userApi}/signIn`, userLogin); // no need to check if authenticated

// change
app.post(`${userApi}/placeOrder`, placeUserOrder);
// change
app.patch(`${userApi}/updateUserProfile`, updateUserProfile);

// product api
app.get(`${productApi}/fetchAllProducts`, getAllProducts); // no need to check if authenticated
// change
app.post(`${productApi}/uploadNewProduct`, createNewProduct);
app.delete(`${productApi}/deleteProduct/:prodID`, deleteProduct);
app.patch(`${productApi}/updateProductInfo/:prodID`, updateProductInfo);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
