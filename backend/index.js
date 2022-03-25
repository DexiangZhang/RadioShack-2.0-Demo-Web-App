require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getAllUsers = require("./src/routes/getAllUsers");
const createNewUser = require("./src/routes/createNewUser");

app.get("/api/users/", getAllUsers);
app.post("/api/users/", createNewUser);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
