const { createNewOrder } = require("../core/user");

module.exports = async (req, res) => {
  const message = await createNewOrder(req, res);
  res.status(200).send(message);
};
