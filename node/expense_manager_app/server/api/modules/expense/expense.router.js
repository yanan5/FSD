const router = require("express").Router();
const {
  POST: { ERR_MSG, SUCCESS_MSG },
  PUT: { ERR_MSG: PUT_ERR_MSG, SUCCESS_MSG: PUT_SUCCESS_MSG },
  DELETE: { ERR_MSG: DELETE_ERR_MSG, SUCCESS_MSG: DELETE_SUCCESS_MSG }
} = require("../../../../constants");
const { readFileAsync, isEmpty, isEmptyObj } = require("../../../utils");
const { isRequiredFieldsPresent, getExpenseByFilter } = require("./utils");

// write all routing code and logic here

router.get(
  "/:category?",
  async (req, res, next) => {
    try {
      let expense = JSON.parse(await readFileAsync("db.json"));
      let result = getExpenseByFilter(expense, req);
      if (result.length > 0) {
        res.locals.result = result;
        next();
      } else {
        next(404);
      }
    } catch (err) {
      console.log(err);
      //res.status(404).send("Not Found");
      next(404);
    }
  },
  (req, res, next) => {
    res.status(200).send(res.locals.result);
  }
);

router.post("/", async (req, res) => {
  let { data } = req.body;

  if (isEmpty(data)) {
    return res.status(400).send(ERR_MSG["NO_RECORD"]);
  } else if (isEmptyObj(data)) {
    return res.status(400).send(ERR_MSG["EMPTY_RECORD"]);
  } else if (!isRequiredFieldsPresent(data)) {
    return res.status(400).send(ERR_MSG["INVALID_RECORD"]);
  }
  let isDuplicate;
  let expenseData;
  try {
    expenseData = JSON.parse(await readFileAsync("db.json"));
    isDuplicate = expenseData.find(
      val => parseInt(val.id, 10) === parseInt(data.id, 10)
    );
  } catch (e) {
    console.log(e);
    return;
  }

  if (isDuplicate) {
    return res.status(400).send(ERR_MSG["DUPLICATE_RECORD"]);
  }
  res.status(201).send(SUCCESS_MSG["CREATED_RECORD"]);
});
router.put("/", async (req, res) => {
  let { data } = req.body;

  if (isEmpty(data)) {
    return res.status(400).send(PUT_ERR_MSG["NO_RECORD"]);
  } else if (isEmptyObj(data)) {
    return res.status(400).send(PUT_ERR_MSG["EMPTY_RECORD"]);
  } else if (isEmpty(data.id)) {
    return res.status(400).send(PUT_ERR_MSG["RECORD_WITHOUT_ID"]);
  } else if (!isEmpty(data.id) && !isRequiredFieldsPresent(data)) {
    return res.status(400).send(PUT_ERR_MSG["INVALID_RECORD"]);
  }
  let recordNotFound;
  let expenseData;
  try {
    expenseData = JSON.parse(await readFileAsync("db.json"));
    recordNotFound = expenseData.find(
      val => parseInt(val.id, 10) === parseInt(data.id, 10)
    );
  } catch (e) {
    console.log(e);
    return;
  }

  if (!recordNotFound) {
    return res.status(404).send(PUT_ERR_MSG["RECORD_NOT_FOUND"]);
  }
  res.status(200).send(PUT_SUCCESS_MSG["UPDATED_RECORD"]);
});
router.delete("/", async (req, res) => {
  let { data } = req.body;

  if (isEmpty(data) || isEmptyObj(data)) {
    return res.status(400).send(DELETE_ERR_MSG["NO_RECORD"]);
  } else if (isEmpty(data.id)) {
    return res.status(400).send(DELETE_ERR_MSG["RECORD_WITHOUT_ID"]);
  }
  let recordNotFound;
  let expenseData;
  try {
    expenseData = JSON.parse(await readFileAsync("db.json"));
    recordNotFound = expenseData.find(
      val => parseInt(val.id, 10) === parseInt(data.id, 10)
    );
  } catch (e) {
    console.log(e);
    return;
  }

  if (!recordNotFound) {
    return res.status(404).send(DELETE_ERR_MSG["RECORD_NOT_FOUND"]);
  }
  res.status(200).send(DELETE_SUCCESS_MSG["DELETE_RECORD"]);
});
module.exports = router;
