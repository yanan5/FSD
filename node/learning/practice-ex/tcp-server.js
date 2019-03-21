let http = require("net");
let sockets = [];
let tcp = http.createServer(socket => {
  socket.write("hello");
  socket.write("world");
  sockets.push(socket);
  socket.on("data", data => {
    sockets.forEach((st, index) => {
      if (st !== socket) {
        st.write(data);
      }
    });
  });
  socket.on("end", () => {
    let index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });
});
console.log("server listening on port 8000");
tcp.listen(8000);
