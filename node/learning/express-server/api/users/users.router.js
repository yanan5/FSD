const router = require("express").Router();
const users = [
  { id: 1, name: "Arul", age: 3 },
  { id: 2, name: "Ilamaran", age: 2 }
];

router.get("/:name", (req, res) => {
  const usersByName = users.filter(({ name }) => name === req.params.name);
  if (usersByName.length > 0) {
    res.status(200).send(JSON.stringify(usersByName));
  } else {
    res.status(404).send(`User "${req.params.name}" Not Found`);
  }
});
router.get("/", (req, res) => res.status(200).send(JSON.stringify(users)));

router.post("/", (req, res) => {
  let user = users.find(({ id }) => id === req.body.id);
  if (user) {
    res.status(200).send("User already present");
  } else {
    users.push(req.body);
    res.status(201).send("user added successfully");
  }
});

module.exports = router;
