module.exports = {
  POST: {
    ERR_MSG: {
      DUPLICATE_RECORD: "Expense record is already exist with the given id",
      EMPTY_RECORD:
        "Empty data is not allowed, please provide some valid data to insert record",
      NO_RECORD: "Please provide some data to add new expense",
      INVALID_RECORD:
        "Please provide values for id ,title, category, description, amount and expenseDate. All are mandatory data elements"
    },
    SUCCESS_MSG: {
      CREATED_RECORD: "Expense record is added successfully"
    }
  },
  PUT: {
    ERR_MSG: {
      RECORD_NOT_FOUND: "Expense record is not found with the given id",
      EMPTY_RECORD:
        "Empty data is not allowed, please provide some valid data to update record",
      NO_RECORD: "Please provide id and some data to update expense record",
      RECORD_WITHOUT_ID: "Please provide expense id to update record",
      INVALID_RECORD: "Please provide values those needs to update"
    },
    SUCCESS_MSG: {
      UPDATED_RECORD: "Expense record is updated successfully"
    }
  },
  DELETE: {
    ERR_MSG: {
      RECORD_NOT_FOUND:
        "Expense provide correct id, there is no expense record with the given id",
      NO_RECORD: "Please provide expense id to delete expense record",
      RECORD_WITHOUT_ID: "Please provide expense id to delete expense record"
    },
    SUCCESS_MSG: {
      DELETE_RECORD: "Expense record is deleted successfully"
    }
  }
};
