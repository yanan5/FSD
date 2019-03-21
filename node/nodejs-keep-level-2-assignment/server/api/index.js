const router = require("express").Router();

//write your routes here
router.use("/v1", require("./v1"));
module.exports = router;
