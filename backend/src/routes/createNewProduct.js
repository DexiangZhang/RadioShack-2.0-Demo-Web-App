const { createNewProduct } = require("../core/product");

module.exports = async (req, res) => {
  const successMsg = await createNewProduct(req, res);
  res.status(201).send(successMsg);
};
