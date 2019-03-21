let router = require("../router");
let url = require("url");
let moment = require("moment");
///datetostring/06/08/1991○ Will return August 6, 19912
let getDateDetailsFromUrl = urlString => {
  let { pathname } = url.parse(urlString, true, true);
  let [path, date, month, year] = pathname.substr(1).split("/");
  return { year, month: month && month - 1, date };
};
router.get("/datetostring", (req, res) => {
  res.statusCode = 200;
  let formattedDate = moment()
    .set(getDateDetailsFromUrl(req.url))
    .format("MMMM, D, YYYY");

  res.write(formattedDate);
  res.end();
});
