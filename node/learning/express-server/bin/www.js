let app = require("../server");
let bodyParser = require("body-parser");
const router = require("express").Router();
const api = require("../api");
//app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  (req, res, next) => {
    console.log("loggin activity");
    next();
  },
  (req, res, next) => (req.get("token") === "jwttoken" ? next() : next(401))
);

app.use("/api", api);

app.use((req, res, next) => next(404));
app.use((err, req, res, next) => {
  console.log("error mddleware called");
  res.sendStatus(err);
});

let server = app.listen(process.env.PORT || 3000, () =>
  console.log("Server is listening on port", 3000)
);

server.on("error", err => console.log("error", err));
