let router = require("../router");
router.get("/bar", (req, res) => {
  res.statusCode = 200;
  res.end("bar");
});

router.post("/bar", (req, res) => {
  res.statusCode = 201;
  res.end("POST bar");
});

router.patch("/bar", (req, res) => {
  res.statusCode = 201;
  res.end("PATCH bar");
});
