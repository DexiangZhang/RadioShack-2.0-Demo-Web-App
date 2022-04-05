require("dotenv").config();

const { Pool, Client } = require("pg");
const { nanoid } = require("nanoid");

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

// get all the exisitng product detail from the database
let getAllProducts = async () => {
  try {
    const data = await pool.query(
      `SELECT * FROM ${TABLE_NAMES.productDatabase}`
    );

    return data.rows;
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// allow customer to add new product to product database
let createNewProduct = async (req, res) => {
  try {
    // generate unique id
    let product_id = nanoid(10);
    let id = req.params.userID;

    let {
      productImage,
      productName,
      quality,
      description,
      unitPrice,
      status,
      category,
    } = req.body;

    await pool.query(
      `INSERT INTO ${TABLE_NAMES.productDatabase} 
      (product_id, product_image, product_name, quality, descriptions, unit_price, product_status, category, user_id) 
      VALUES ('${product_id}', '${productImage}','${productName}', ${quality}, '${description}', ${unitPrice}, '${status}', '${category}', ${id});`
    );

    return SUCCESS_MSG.uploadProdSucText;
  } catch (err) {
    res.send(ERROR_MSG.duplicateProdText);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
};
