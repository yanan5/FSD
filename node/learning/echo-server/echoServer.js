let http = require("http");

let server = http.createServer((req, res) => {
  console.log("reqquiest");
  req.on("error", err => {
    console.log("request error", err);
    res.statusCode = 400;
    res.end();
  });
  res.on("error", err => {
    console.log("response error", err);
  });
  if (req.method === "POST" && req.url.indexOf("/echo") !== -1) {
    req.pipe(res);
  } else {
    res.statusCode = 404;
    res.end();
  }
});
server.listen(8080);
