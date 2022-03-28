const { getUserProfile } = require("../core/user");

module.exports = async (req, res) => {
  const userInfo = await getUserProfile(req, res);
  res.status(200).send(userInfo);
};
