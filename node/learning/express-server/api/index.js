const router = require("express").Router();

router.get("/", (req, res) => res.send("Hello Express using router"));
router.use("/users", require("./users"));

module.exports = router;
