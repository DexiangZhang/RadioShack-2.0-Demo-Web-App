const { validateUser } = require("../core/user");

module.exports = async (req, res) => {
  const dataObj = await validateUser(req, res);
  res.status(200).send(dataObj);
};
