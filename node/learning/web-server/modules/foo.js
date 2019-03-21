let router = require("../router");
router.get("/foo", (req, res) => {
  res.statusCode = 200;
  res.end("foo");
});
router.get("/foo/bar", (req, res) => {
  res.statusCode = 200;
  res.end("foo bar");
});

router.post("/foo", (req, res) => {
  res.statusCode = 201;
  res.end("POST foo");
});

router.patch("/foo", (req, res) => {
  res.statusCode = 201;
  res.end("PATCH foo");
});
