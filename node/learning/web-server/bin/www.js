const server = require("../index");

server.listen(3000);

server.on("connection", socket =>
  console.log(`Got a new connection ${socket}`)
);
server.on("request", () => console.log("*** Got a new connection ***"));
server.on("error", err => console.log(err));
