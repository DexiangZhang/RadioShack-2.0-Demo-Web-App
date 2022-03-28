const { insertNewUser } = require("../core/user");

module.exports = async (req, res) => {
  const successMsg = await insertNewUser(req, res);
  res.status(200).send(successMsg);
};
