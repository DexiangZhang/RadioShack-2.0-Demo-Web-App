const { InsertNewUser } = require("../core/user");

module.exports = async (req, res) => {
  const users = await InsertNewUser(req, res);
  res.status(200).send({ users });
};
