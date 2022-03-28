require("dotenv").config();

const { Pool, Client } = require("pg");
const {
  TABLE_NAMES,
  ERROR_MSG,
  SUCCESS_MSG,
} = require("../constants/constantsVar");

const credentials = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(credentials);

// return all the created users from the database
let getUsers = async () => {
  try {
    const data = await pool.query(`SELECT * FROM ${TABLE_NAMES.usersDatabase}`);

    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// create new user and store it into database
let insertNewUser = async (req, res) => {
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

    await pool.query(
      `INSERT INTO ${TABLE_NAMES.usersDatabase} (username, user_password, email, first_name, last_name,home_address,phone_num) VALUES ('${username}', '${password}','${email}', '${firstName}', '${lastName}', '${homeAddress}', ${phoneNum});`
    );
    return SUCCESS_MSG.createText;
  } catch (err) {
    res.send(ERROR_MSG.duplicateText);
  }
};

// validate the user password and username when login
let validateUser = async (req, res) => {
  try {
    let { username, password } = req.body;

    let data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.usersDatabase} WHERE username = '${username}'`
    );

    // information found
    if (data.rowCount !== 0) {
      let { rows } = data;

      let matchPassword = rows[0].user_password === password;

      if (matchPassword) {
        return SUCCESS_MSG.loginSuccessText;
      } else {
        return ERROR_MSG.passwordText;
      }
    } else {
      return ERROR_MSG.accountText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

module.exports = {
  getUsers,
  insertNewUser,
  validateUser,
};
