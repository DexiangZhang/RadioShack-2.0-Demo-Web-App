const { getAllUserOrders } = require("../core/user");

module.exports = async (req, res) => {
  const userOrders = await getAllUserOrders();
  res.status(200).send(userOrders);
};
