var http = require("http");
var fs = require("fs");
let events = require("events");
const em = new events.EventEmitter();
em.on("knock", data => console.log("knock event emitted with data = " + data));

fs.readFile("package.json", (err, content) => {
  console.log(content.toString());
});
// setInterval(() => {
//   console.log("World");
// }, 5000);

// setInterval(() => {
//   console.log("fetching imdb.com");
//   http.get({ host: "imdb.com" }, res => {
//     console.log(res.headers);
//   });
// }, 2000);
console.log("Hello");
function foo() {
  debugger;
  return 1 + 2;
}
foo();
let index = 0;
let server = http.createServer((req, res) => {
  console.log("server creaated" + index++);
  res.writeHead(200, { "content-type": "text/plain" });
  res.write("hello");
  setTimeout(() => {
    res.end("world" + index);
    em.emit("knock", "emitting knock from inside create server");
  }, 2000);
});
console.log("server listening on port 8000");
server.listen(8000);
