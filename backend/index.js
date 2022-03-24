require("dotenv").config();

const express = require("express");
const app = express();

const getAllUsers = require("./src/routes/getAllUsers");

app.get("/api/users/", getAllUsers);

app.listen(process.env.PORT, () => {
  console.log(`server has started at PORT ${process.env.PORT}`);
});
