const { userModel } = require("../../../modules");

const getUser = ({ body: { username } }) =>
  userModel.findOne({ username }).exec();

const registerUser = ({ body: { username, password } }) => {
  console.log("from register user", username, password);
  let user = new userModel({ username, password });
  return user.save();
};

const loginUser = req => getUser(req);

module.exports = {
  registerUser,
  loginUser,
  getUser
};
