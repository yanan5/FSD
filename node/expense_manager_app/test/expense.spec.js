const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");
const {
  POST: { ERR_MSG, SUCCESS_MSG },
  PUT: { ERR_MSG: PUT_ERR_MSG, SUCCESS_MSG: PUT_SUCCESS_MSG },
  DELETE: { ERR_MSG: DELETE_ERR_MSG, SUCCESS_MSG: DELETE_SUCCESS_MSG }
} = require("../constants");
// testsuit starts from here
describe("Expense Manager testing", function() {
  //testsuit for functionality testing
  describe("Functionality testing", function() {
    // testsuit for adding expense
    describe("Adding expense functionality testing", function() {
      // testcase to insert expense record
      it("Should create expense, returning success message", function(done) {
        //write assertion code here and your response should return below given message
        //'Expense record is added successfully'
        request(app)
          .post("/api/expense")
          .send({
            data: {
              id: 6,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.text).to.equal(SUCCESS_MSG["CREATED_RECORD"]);
            done();
          });
      });
      // testcase to handle, if expense record is already exist with the given id
      it("Should not create expense if expense is already exist with the given id, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        //'Expense record is already exist with the given id'
        request(app)
          .post("/api/expense")
          .send({
            data: {
              id: 3,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(ERR_MSG["DUPLICATE_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is passing empty record.
      it("Should not create expense if passing empty record, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        //'Empty data is not allowed, please provide some valid data to insert record'
        request(app)
          .post("/api/expense")
          .send({ data: {} })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(ERR_MSG["EMPTY_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is not passing any record in post body.
      it("Should not create expense if user is not passing any record in post request, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide some data to add new expense'
        request(app)
          .post("/api/expense")
          .send({})
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(ERR_MSG["NO_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is passing wrong key as a record.
      it("Should not create expense if user is passing wrong data, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide values for id ,title, category, description, amount and expenseDate. All are mandatory data elements'
        request(app)
          .post("/api/expense")
          .send({
            data: {
              id: "",
              title: "",
              category: "some category",
              description: "some description",
              amount: 45,
              expenseDate: ""
            }
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(ERR_MSG["INVALID_RECORD"]);
            done();
          });
      });
    });
    // testsuit to get all expense record
    describe("Getting all expense functionality testing", function() {
      it("Should get all expense, returning array of expense ", function(done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get("/api/expense")
          .expect(200)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.at.least(1);
            done();
          });
      });
    });
    // testsuit to update expense record
    describe("Updating expense functionality testing", function() {
      // testcase to update particular expense category
      it("Should search expense by id and update expense category, returning success message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is updated successfully'
        request(app)
          .put("/api/expense")
          .send({
            data: {
              id: 2,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.text).to.equal(PUT_SUCCESS_MSG["UPDATED_RECORD"]);
            done();
          });
      });
      // testcase to handle, if no expense record will be found by given category
      it("Should search expense by id if expense is not found with the given id, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is not found with the given id'
        request(app)
          .put("/api/expense")
          .send({
            data: {
              id: 9,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(PUT_ERR_MSG["RECORD_NOT_FOUND"]);
            done();
          });
      });
      // testcase to handle, if user is passing empty record.
      it("Should not update expense if passing empty record, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Empty data is not allowed, please provide some valid data to update record'
        request(app)
          .put("/api/expense")
          .send({
            data: {}
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(PUT_ERR_MSG["EMPTY_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is not passing any record in put body.
      it("Should not update expense if user is not passing any record in update request, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide id and some data to update expense record'
        request(app)
          .put("/api/expense")
          .send({})
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(PUT_ERR_MSG["NO_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is not passing id in update request.
      it("Should not update expense if passing without any id, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to update record'
        request(app)
          .put("/api/expense")
          .send({
            data: {
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(PUT_ERR_MSG["RECORD_WITHOUT_ID"]);
            done();
          });
      });
      // testcase to handle, if user is passing id only id not other field values.
      it("Should not update expense if passing only id not other fields, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide values those needs to update'
        request(app)
          .put("/api/expense")
          .send({
            data: {
              id: 2,
              title: "another title",
              description: "anpother description",
              amount: 56
            }
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(PUT_ERR_MSG["INVALID_RECORD"]);
            done();
          });
      });
    });
    // testsuit to search and get expense record according to given condition
    describe("Searching expense functionality testing", function() {
      // testcase to get all expense those are matching with given start and end date
      it("Should search expense by start and end date, returning matching expense data as an array", function(done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get("/api/expense?startDate=26/05/2017&endDate=18/11/2017")
          .expect(200)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.at.least(2);
            done();
          });
      });
      // testcase to get all expense, those are equal to given start date and greater than given start date
      it("Should search expense by start date only, returning expense data where date is greater than and equal to the given start date", function(done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get("/api/expense?startDate=01/01/2018")
          .expect(200)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.at.least(2);
            done();
          });
      });
      // testcase to get all expense those are matching with given category, start and end date.
      it("Should search expense by category, start and end date, returning matching expense data as an array", function(done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get("/api/expense/fair?startDate=26/05/2017&endDate=01/03/2018")
          .expect(200)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.at.least(2);
            done();
          });
      });
      // // testcase to get all expense, those are equal to given category, start date and greater than given start date
      it("Should search expense by category and start date only, returning expense data matching with given category and date should be greater than and equal to start date", function(done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get("/api/expense/fair?startDate=26/05/2017")
          .expect(200)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.body).to.be.an("array");
            expect(res.body.length).to.be.at.least(2);
            done();
          });
      });
      // // testcase to get all expense, those are equal to given category, start date and greater than given start date
      it("Should handle 404 error if route not matched, returning Not Found message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Not Found'
        request(app)
          .get("/api/expense/faired?startDate=26/05/2017")
          .expect(404)
          .end((err, res) => {
            if (err) return done(null);
            expect(res.error.text).to.equal("Not Found");
            done();
          });
      });
    });
    // testsuit to delete a expense record
    describe("Deleting expense functionality testing", function() {
      // testcase to delete expense record by given id
      it("Should search expense by id and delete particular expense record, returning success message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is deleted successfully'
        request(app)
          .delete("/api/expense")
          .send({
            data: {
              id: 2,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.text).to.equal(DELETE_SUCCESS_MSG["DELETE_RECORD"]);
            done();
          });
      });
      // testcase to handle, if no expense record will be found by given id
      it("Should search expense by id if expense is not found with the given id, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Expense provide correct id, there is no expense record with the given id'
        request(app)
          .delete("/api/expense")
          .send({
            data: {
              id: 9,
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(DELETE_ERR_MSG["RECORD_NOT_FOUND"]);
            done();
          });
      });
      // testcase to handle, if user is not passing any record in delete body.
      it("Should not delete expense if user is not passing any record in delete request, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to delete expense record'
        request(app)
          .delete("/api/expense")
          .send({})
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(DELETE_ERR_MSG["NO_RECORD"]);
            done();
          });
      });
      // testcase to handle, if user is not passing id in delete request body.
      it("Should not delete expense if not passing id, returning error message", function(done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to delete expense record'
        request(app)
          .delete("/api/expense")
          .send({
            data: {
              title: "another title",
              category: "another category",
              description: "anpother description",
              amount: 56,
              expenseDate: "11/05/2019"
            }
          })
          .set("Accept", "application/json")
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.error.text).to.equal(
              DELETE_ERR_MSG["RECORD_WITHOUT_ID"]
            );
            done();
          });
      });
    });
  });
});
