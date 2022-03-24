const { getUsers } = require("../core/user");

module.exports = async (req, res) => {
  const users = await getUsers();
  res.status(200).send({ message: users });
};
