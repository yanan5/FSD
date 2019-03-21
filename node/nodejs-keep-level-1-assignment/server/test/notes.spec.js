const should = require("chai").should();
const request = require("supertest");
const app = require("../app");
const config = require("./test.config");
const { initializeMongooseConnection, getConnection } = require("../db");
const mongoose = require("mongoose");
const USER_ID_1 = "ramaswamy1";
const USER_ID_2 = "ramaswamy";
const No_User = "xyz";

describe("Testing Notes Route", function() {
  let connection;
  before(function(done) {
    // runs before all tests in this block
    initializeMongooseConnection(config.DB_CONFIG.url).then(() => {
      connection = getConnection();
      done();
    });
  });

  after(function(done) {
    // runs after all tests in this block
    // connection.close(() => done()); //.then(() => done());
    //
    //mongoose.connection.db.dropDatabase(function() {
    mongoose.connection.close(() => done());
    process.exit(0);
    //});
  });
  //  testsuite
  describe("Testing to add a note", function() {
    //  testcase
    it("Should handle a request to add a new note for user 1 ", function(done) {
      // Should get added note of user 1 as a respone,  need to match added note text value
      // status = 201
      // response will be added note object
      let req = {
        userId: USER_ID_1,
        title: "two more sdf Note",
        text: "2 two safdsafsf Note text",
        state: "started"
      };
      request(app)
        .post("/api/v1/notes")
        .send(req)
        .set("Accept", "application/json")
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.text.should.be.equal(req.text);
          done();
        });
    });

    //  testcase
    it("Should handle a request to add a new note for user 2", function(done) {
      // Should get added note of user 2 as a respone,  need to match added note text value
      // status = 201
      // response will be added note object
      let req = {
        userId: USER_ID_2,
        title: "two more sdf Note",
        text: "2 two safdsafsf Note text",
        state: "started"
      };
      request(app)
        .post("/api/v1/notes")
        .send(req)
        .set("Accept", "application/json")
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.text.should.be.equal(req.text);
          done();
        });
    });
  });

  //  testsuite
  describe("Testing to get all notes", function() {
    //  testcase
    it("Should handle a request to get all notes of a user 1", function(done) {
      // Should get all note as a array those are created by user 1 and Should match recently added note text value
      // status = 200
      // response will be a array or all notes those are added by user 1
      let req = {
        userId: USER_ID_1
      };
      request(app)
        .get("/api/v1/notes")
        .send(req)
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.be.least(1);
          done();
        });
    });

    //  testcase
    it("Should handle a request to get all notes of a user 2", function(done) {
      // Should get all note as a array those are created by user 2 and Should match recently added note text value
      // status = 200
      // response will be a array or all notes those are added by user 2
      let req = {
        userId: USER_ID_2
      };
      request(app)
        .get("/api/v1/notes")
        .send(req)
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.be.least(1);
          done();
        });
    });

    //  testcase
    it("Should handle a request to get notes of a user who has not created any note", function(done) {
      // should get blank array
      // status = 200
      // response will be an empty array
      let req = {
        userId: No_User
      };
      request(app)
        .get("/api/v1/notes")
        .send(req)
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.be.equal(0);
          done();
        });
    });
  });

  //  testsuite
  describe("Testing to update a note", function() {
    // let connection;
    // before(function(done) {
    //   // runs before all tests in this block
    //   initializeMongooseConnection(config.DB_CONFIG.url).then(() => {
    //     connection = getConnection();
    //     done();
    //   });
    // });
    //
    // after(function(done) {
    //   // runs after all tests in this block
    //   // connection.close(() => done()); //.then(() => done());
    //   //
    //   //mongoose.connection.db.dropDatabase(function() {
    //   mongoose.connection.close(() => done());
    //   process.exit(0);
    //   //  });
    // });
    //  testcase
    it("Should handle a request to update a note by note id", function(done) {
      // Should return updated note and match updated note text value'
      // status = 200
      // response will hold updated note as an object
      // let req = {
      //   title: "UPDATED TITLE",
      //   text: "UPDATED TEXT"
      // };
      // request(app)
      //   .post("/api/v1/notes/5c3aee69903ef530acbd08d0")
      //   .send(req)
      //   .set("Accept", "application/json")
      //   .expect(200)
      //   .end(function(err, res) {
      //     if (err) return done(err);
      //     res.body.text.should.be.equal(req.text);
      //     done();
      //   });
      done();
    });
  });
});
