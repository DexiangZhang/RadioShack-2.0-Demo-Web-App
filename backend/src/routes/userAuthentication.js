const { validateUser } = require("../core/user");

module.exports = async (req, res) => {
  const message = await validateUser(req, res);
  res.status(200).send(message);
};
