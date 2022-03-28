const { updateUserProfile } = require("../core/user");

module.exports = async (req, res) => {
  const message = await updateUserProfile(req, res);
  res.status(200).send(message);
};
