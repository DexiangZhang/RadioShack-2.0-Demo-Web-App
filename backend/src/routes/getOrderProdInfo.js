const { getUserOrderDetails } = require("../core/user");

module.exports = async (req, res) => {
  const orderProducts = await getUserOrderDetails(req, res);
  res.status(200).send(orderProducts);
};
