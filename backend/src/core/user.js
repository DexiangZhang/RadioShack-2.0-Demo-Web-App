require("dotenv").config();

const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    // encypt user password
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTS));
    const hash = bcrypt.hashSync(password, salt);

    //Store hash in your password DB
    await pool.query(
      `INSERT INTO ${TABLE_NAMES.usersDatabase} 
      (username, user_password, email, first_name, last_name,home_address,phone_num) 
      VALUES ('${username}', '${hash}', '${email}', '${firstName}', '${lastName}','${homeAddress}', ${phoneNum});`
    );

    return SUCCESS_MSG.createText;
  } catch (err) {
    res.send(ERROR_MSG.duplicateText);
  }
};

let refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  // token not provided
  if (!refreshToken) {
    res.send("Token not found");
  }

  try {
    const { sub } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // generate new token
    const token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
      subject: sub,
    });

    return {
      msg: "New Token Generated",
      idToken: token,
      refreshToken: refreshToken,
      expiresIn: process.env.JWT_EXPIRES,
    };
  } catch (err) {
    res.send("Invalid token");
  }
};

// validate the user password and username when login
let validateUser = async (req, res) => {
  try {
    let { username, password } = req.body;

    let data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.usersDatabase} 
      WHERE username = '${username}'`
    );

    // information found
    if (data.rowCount !== 0) {
      let { rows } = data;

      const matchPassword = await bcrypt.compare(
        password,
        rows[0].user_password
      );

      if (matchPassword) {
        let userID = rows[0].user_id;

        // generate token
        // use the default HS256 algorithm
        let token = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES,
          subject: userID.toString(),
        });

        // refresh token for the user
        let refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
          expiresIn: process.env.JWT_REFRESH_EXPIRES,
          subject: userID.toString(),
        });

        return {
          msg: SUCCESS_MSG.loginSuccessText,
          idToken: token,
          refreshToken: refreshToken,
          expiresIn: process.env.JWT_EXPIRES,
        };
      } else {
        return { msg: ERROR_MSG.passwordText };
      }
    } else {
      return { msg: ERROR_MSG.accountText };
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// reset the password
let resetPassword = async (req, res) => {
  try {
    let { username, newPassword } = req.body;

    // encrypt the new password
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTS));
    const hash = bcrypt.hashSync(newPassword, salt);

    let data = await pool.query(
      `UPDATE ${TABLE_NAMES.usersDatabase} 
      SET user_password = '${hash}' 
      WHERE username = '${username}'`
    );

    if (data.rowCount !== 0) {
      return SUCCESS_MSG.resetPWDSucText;
    } else {
      return ERROR_MSG.accountText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// get the single user information
let getUserProfile = async (req, res) => {
  try {
    // req.user  is the decode token default information from the middleware in app.js
    let id = req.user.sub;

    const data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.usersDatabase} 
      WHERE user_id = ${id}`
    );

    // found that user
    if (data.rowCount !== 0) {
      let { rows } = data;
      return rows[0];
    } else {
      return ERROR_MSG.userErrorText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// receive data from front-end and update the information in the database
let updateUserProfile = async (req, res) => {
  try {
    let { email, firstName, lastName, homeAddress, phoneNum } = req.body;

    let id = req.user.sub;

    let data = await pool.query(
      `UPDATE ${TABLE_NAMES.usersDatabase} 
      SET email='${email}', first_name='${firstName}', last_name='${lastName}', home_address ='${homeAddress}', phone_num = '${phoneNum}' 
      WHERE user_id = ${id}`
    );

    if (data.rowCount !== 0) {
      return SUCCESS_MSG.updateSucText;
    } else {
      return ERROR_MSG.updateErrorText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// receive all order data from front-end, and create order invoice in database
let createNewOrder = async (req, res) => {
  try {
    let id = req.user.sub;
    let orderNum = nanoid(10);

    let {
      orderStatus,
      totalPrice,
      firstName,
      lastName,
      deliAddress,
      contactNum,
      ItemLists,
    } = req.body; // get data from angular project

    await pool.query(
      `INSERT INTO ${TABLE_NAMES.orderDatabase} 
      (order_num, order_status, total_price, cust_first_name, cust_last_name, cust_deli_address, cust_contact_num, user_id) 
      VALUES ('${orderNum}', '${orderStatus}',  ${totalPrice}, '${firstName}', '${lastName}', '${deliAddress}', '${contactNum}', ${id});`
    );

    //Itemslist is array of object:    [{....}, {....}]
    //store each each object to database in Itemslist
    for (let product of ItemLists) {
      await pool.query(
        `INSERT INTO ${TABLE_NAMES.orderProdDatabase} 
        (total_price_product, product_quality, unit_price, product_title, product_image, order_num, product_category, product_id) 
        VALUES (${product.totalPrice}, ${product.quality}, ${product.price}, 
        '${product.name}', '${product.image}', '${orderNum}', '${product.category}', '${product.id}');`
      );

      // update the product databse quality of each order product and status for each product
      await pool.query(
        `UPDATE ${TABLE_NAMES.productDatabase} 
        SET quality = quality - ${product.quality}, product_status = CASE WHEN quality = 0 THEN 'OutofStock' ELSE product_status END
        WHERE product_id = '${product.id}'`
      );

      await pool.query(
        `UPDATE ${TABLE_NAMES.productDatabase} 
        SET product_status = CASE WHEN quality = 0 THEN 'OutofStock' ELSE product_status END
        WHERE product_id = '${product.id}'`
      );
    }

    return SUCCESS_MSG.orderSucText;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// get all order information from database
let getAllUserOrders = async () => {
  try {
    const data = await pool.query(`SELECT * FROM ${TABLE_NAMES.orderDatabase}`);

    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// get the user order history
let getUserOrders = async (req, res) => {
  try {
    let id = req.user.sub;
    const data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.orderDatabase} WHERE user_id = ${id}`
    );

    // since it might have multiple order from same user, so we return array of objects that match the query
    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// get user order products information
let getUserOrderDetails = async (req, res) => {
  try {
    let orderNum = req.params.orderNum;

    const data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.orderProdDatabase} 
      WHERE order_num = '${orderNum}'`
    );

    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// get the exisitng product detail from the database based on userID
let getUserProducts = async (req, res) => {
  try {
    let id = req.user.sub;
    const data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.productDatabase} WHERE user_id = ${id}`
    );

    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

module.exports = {
  getUsers,
  insertNewUser,
  validateUser,
  getUserProfile,
  updateUserProfile,
  createNewOrder,
  getUserOrders,
  getUserOrderDetails,
  getAllUserOrders,
  resetPassword,
  getUserProducts,
  refreshToken,
};
