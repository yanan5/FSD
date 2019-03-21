const userDao = require("./users.dao");
let passUtil = require("../../../utils");
let jwt = require("../../../jwt");
let {
  secret,
  expiresIn
} = require("../../../config").appConfig.PASSPORT_CONFIG;
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
      console.log(expiresIn);
      jwt.signJWTToken(
        { name: doc.username, id: doc._id },
        secret,
        expiresIn,
        (err, token) => {
          if (err) return next(err);
          res.locals.token = token;
          res.locals.doc = doc;
          next();
        }
      );
    }
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registerUser,
  loginUser
};
