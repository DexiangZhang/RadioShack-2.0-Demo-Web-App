require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger_docs/swaggerAPI.yaml");

const expressJwt = require("express-jwt");

// middware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
      "/api/user/refreshToken",
      "/api-docs",
    ],
  })
);

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
const getUserProducts = require("./src/routes/getUserProducts");
const refreshToken = require("./src/routes/getNewAccessToken");

const getAllProducts = require("./src/routes/getAllProducts");
const createNewProduct = require("./src/routes/createNewProduct");
const deleteProduct = require("./src/routes/deleteProduct");
const updateProductInfo = require("./src/routes/updateProductInfo");

// user api
app.get(`${userApi}/fetchAllUsers`, getAllUsers);
app.get(`${userApi}/getAllUserOrders`, getAllUserOrders);
app.get(`${userApi}/getUserProfile`, getUserProfile);
app.get(`${userApi}/getUserOrders`, getUserOrders);
app.get(`${userApi}/getUserOrderProduct/:orderNum`, getUserOrderProdInfo);
app.get(`${userApi}/getUserProducts`, getUserProducts);
app.post(`${userApi}/refreshToken`, refreshToken);
app.post(`${userApi}/resetPassword`, resetUserPassword); // no need to check if authenticated
app.post(`${userApi}/signUp`, createNewUser); // no need to check if authenticated
app.post(`${userApi}/signIn`, userLogin); // no need to check if authenticated
app.post(`${userApi}/placeOrder`, placeUserOrder);
app.patch(`${userApi}/updateUserProfile`, updateUserProfile);

// product api
app.get(`${productApi}/fetchAllProducts`, getAllProducts); // no need to check if authenticated
app.post(`${productApi}/uploadNewProduct`, createNewProduct);
app.delete(`${productApi}/deleteProduct/:prodID`, deleteProduct);
app.patch(`${productApi}/updateProductInfo/:prodID`, updateProductInfo);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
