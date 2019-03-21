let http = require("http");
let fs = require("fs");
let path = require("path");
let i = 0;

const asyncReading = (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("hello");
  fs.readFile(path.join(__dirname, "./web-server.js"), "utf8", (err, data) => {
    if (err) throw err;
    res.end(data);
  });
  res.write("world" + i++ + "\n");
};

const syncReading = (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("hello\n");
  let data = fs.readFileSync(path.join(__dirname, "./web-server.js"), "utf8");
  res.write(data);
  res.end("world");
};
let server = http.createServer(syncReading);
console.log("server listening on port 8000");
server.listen(8000);
