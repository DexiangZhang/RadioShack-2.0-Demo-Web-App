const { getUserOrders } = require("../core/user");

module.exports = async (req, res) => {
  const singleUserOrder = await getUserOrders(req, res);
  res.status(200).send(singleUserOrder);
};
