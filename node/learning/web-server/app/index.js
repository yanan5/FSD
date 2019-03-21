require("../modules/foo");
require("../modules/bar");
require("../modules/parseDate");
require("../modules/dateToString");
const router = require("../router");

module.exports = (req, res) => {
  router.execute(req, res);
};
