const { resetPassword } = require("../core/user");

module.exports = async (req, res) => {
  const message = await resetPassword(req, res);
  res.status(200).send(message);
};
