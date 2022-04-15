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
    let id = req.user.sub;

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
    if (err.message.includes("syntax error")) {
      res.send(ERROR_MSG.syntaxtErrorText);
    }
    res.send(ERROR_MSG.duplicateProdText);
  }
};

// delete product from product database with user id
let deleteProduct = async (req, res) => {
  try {
    let pID = req.params.prodID;

    let data = await pool.query(
      `DELETE FROM ${TABLE_NAMES.productDatabase} WHERE product_id = '${pID}';`
    );

    if (data.rowCount === 1) {
      return SUCCESS_MSG.deleteProdSucText;
    } else if (data.rowCount === 0) {
      return ERROR_MSG.deleteProdFailText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

// update product detail in product database with product id
let updateProduct = async (req, res) => {
  try {
    let pID = req.params.prodID;

    let {
      productImage,
      productName,
      quality,
      description,
      unitPrice,
      status,
      category,
    } = req.body;

    let data = await pool.query(
      `UPDATE ${TABLE_NAMES.productDatabase} 
      SET product_image = '${productImage}', product_name = '${productName}', quality = ${quality}, descriptions = '${description}', unit_price = ${unitPrice}, product_status = '${status}', category = '${category}' 
      WHERE product_id = '${pID}';`
    );

    if (data.rowCount === 1) {
      return SUCCESS_MSG.updateProdSucText;
    } else if (data.rowCount === 0) {
      return ERROR_MSG.updateProdFailText;
    }
  } catch (err) {
    res.send(ERROR_MSG.defaultText);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateProduct,
};
