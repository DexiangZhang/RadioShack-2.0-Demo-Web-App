const { getAllProducts } = require("../core/product");

module.exports = async (req, res) => {
  const products = await getAllProducts();
  res.status(200).send(products);
};
