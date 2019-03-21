const router = require("express").Router();
const notesCtrl = require("./notes.ctrl");
const passport = require("passport");
let jwt = require("../../../jwt");
let { secret } = require("../../../config").appConfig.PASSPORT_CONFIG;
router.use(
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // let token = req.headers.authorization.split(" ")[1];
    // let userFromToken = req.user;
    // jwt.verifyJWTToken(token, secret, (err, data) => {
    //   console.log("from verifytoken err", err);
    //   console.log("from verifytoken data", data);
    //   console.log("suerFromToken", req.user);
    //
    // });
    next();
  }
);
router.get("/", notesCtrl.getAllNots, (req, res) => {
  console.log("notes get");
  res.status(200).json(res.locals.doc);
});

router.post("/", notesCtrl.createNote, (req, res) => {
  res.status(201).json(res.locals.doc);
});

router.post("/:noteId", notesCtrl.updateNote, (req, res) => {
  res.status(200).json(res.locals.doc);
});
module.exports = router;
