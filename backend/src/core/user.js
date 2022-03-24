require("dotenv").config();

const { Client } = require("pg");
const { TABLE_NAMES, ERROR_MSG } = require("../constants/constantsVar");

const options = {
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const client = new Client(options);

let getUsers = async () => {
  try {
    client.connect();

    const data = await client.query(
      `SELECT * FROM ${TABLE_NAMES.usersDatabase}`
    );

    client.end();
    return data.rows;
  } catch (err) {
    console.log(`${ERROR_MSG.defaultText}`);
  }
};

module.exports = {
  getUsers,
};
