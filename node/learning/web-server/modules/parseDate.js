let router = require("../router");
let url = require("url");
let moment = require("moment");
// parsedate?day=06&month=08&hour=12&minute=10
// parsedate?month=08&hour=12&minute=10
let getDateDetailsFromUrl = urlString => {
  let { year, month, day: date, hour, minute, second, millisecond } = url.parse(
    urlString,
    true,
    true
  ).query;

  return {
    year,
    month: month && month - 1,
    date,
    hour,
    minute,
    second,
    millisecond
  };
};
router.get("/parsedate", (req, res) => {
  res.statusCode = 200;
  let formattedDate = moment()
    .set(getDateDetailsFromUrl(req.url))
    .format("DD/MM/YYYY HH:mm:ss:SSS");
  res.write(formattedDate);
  res.end();
});
