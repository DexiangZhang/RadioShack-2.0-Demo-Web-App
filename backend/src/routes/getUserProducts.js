const { getUserProducts } = require("../core/user");

module.exports = async (req, res) => {
  const userProducts = await getUserProducts(req, res);
  res.status(200).send(userProducts);
};
