const { refreshToken } = require("../core/user");

module.exports = async (req, res) => {
  const data = await refreshToken(req, res);
  res.status(200).send(data);
};
