const userDao = require("./users.dao");
let passUtil = require("../../../utils");
const registerUser = async (req, res, next) => {
  try {
    let doc = await userDao.getUser(req);
    if (doc == null || doc == undefined) {
      let userDoc = await userDao.registerUser(req);
      res.locals.doc = userDoc;
      next();
    } else {
      next({
        status: 403,
        message: "username is already exist"
      });
    }
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let doc = await userDao.loginUser(req);
    if (doc == null || doc == undefined) {
      next({
        status: 403,
        message: "You are not registered user"
      });
    }
    let isPassMatch = await passUtil.comparePassword(
      req.body.password,
      doc.password
    );
    if (!isPassMatch) {
      next({
        status: 403,
        message: "Password is incorrect"
      });
    } else {
      res.locals.doc = doc;
      next();
    }
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registerUser,
  loginUser
};
