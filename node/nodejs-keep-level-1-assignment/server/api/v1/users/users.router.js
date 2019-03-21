const router = require("express").Router();
const userCtrl = require("./users.ctrl");

router.post("/register", userCtrl.registerUser, (req, res, next) => {
  res.status(201).json({ userInfo: { username: res.locals.doc.username } });
});

router.post("/login", userCtrl.loginUser, (req, res) => {
  res.status(200).json({ user: { username: res.locals.doc.username } });
});

module.exports = router;
