const { updateProduct } = require("../core/product");

module.exports = async (req, res) => {
  const msg = await updateProduct(req, res);
  res.status(200).send(msg);
};
