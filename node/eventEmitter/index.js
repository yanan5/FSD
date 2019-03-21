let EventEmitter = require("events");

class MyEventEmitter extends EventEmitter {}
let myEventInstance = new MyEventEmitter();

myEventInstance.on("myEvent", data => console.log(data));
myEventInstance.on("myEvent", data => console.log(data));

myEventInstance.emit("myEvent", 10);
