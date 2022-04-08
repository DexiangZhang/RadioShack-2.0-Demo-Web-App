const { deleteProduct } = require("../core/product");

module.exports = async (req, res) => {
  const msg = await deleteProduct(req, res);
  res.status(200).send(msg);
};
