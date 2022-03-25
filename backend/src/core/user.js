require("dotenv").config();

const { Pool, Client } = require("pg");
const { TABLE_NAMES, ERROR_MSG } = require("../constants/constantsVar");

const credentials = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(credentials);
//client.connect();

let getUsers = async () => {
  try {
    const data = await pool.query(`SELECT * FROM ${TABLE_NAMES.usersDatabase}`);

    return data.rows;
  } catch (err) {
    console.log(`${ERROR_MSG.defaultText}`);
  }
};

let InsertNewUser = async (req, res) => {
  try {
    let {
      username,
      password,
      email,
      firstName,
      lastName,
      homeAddress,
      phoneNum,
    } = req.body;

    let userInfo = await pool.query(
      `INSERT INTO ${TABLE_NAMES.usersDatabase} (username, userPassword, email, firstName, lastName,homeAddress,phoneNum) VALUES ('${username}', '${password}','${email}', '${firstName}', '${lastName}', '${homeAddress}', ${phoneNum});`
    );

    return userInfo;
  } catch (err) {
    res.send("Duplicate Value");
  }
};

module.exports = {
  getUsers,
  InsertNewUser,
};
