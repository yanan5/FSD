const should = require("chai").should();
const request = require("supertest");
const app = require("../app");
const config = require("./test.config");
const { initializeMongooseConnection, getConnection } = require("../db");
const mongoose = require("mongoose");

describe("Testin User Route", function() {
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
    //  });
  });
  //  testsuite
  describe("Testing to register a user", function() {
    //  testcase
    it("Should handle a request to register a user", function(done) {
      // Response body should have a key as userInfo which will hold 'username' value
      // status code = 201
      // response body will hold user.userName
      let req = {
        username: "ramaswamy1",
        password: "some random password"
      };
      request(app)
        .post("/api/v1/users/register")
        .send(req)
        .set("Accept", "application/json")
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.userInfo.username.should.be.equal(req.username);
          done();
        });
    });

    //  testcase
    it("Should handle a request to register a user multiple times with same username", function(done) {
      //Response body should have a key as message which will hold value as 'username is already exist'
      // status code = 403
      // response body will hold an object with message key
      let req = {
        username: "ramaswamy1",
        password: "some random password"
      };
      request(app)
        .post("/api/v1/users/register")
        .send(req)
        .set("Accept", "application/json")
        .expect(403)
        .end(function(err, res) {
          res.error.text.should.be.equal("username is already exist");
          done();
        });
    });
  });

  //  testsuite
  describe("Testing to login user", function() {
    //  testcase
    it("Should handle a request to successfully login", function(done) {
      //Response body should have a key as user which will hold userName as a key and it will hold username value
      // status code = 200
      // response body will hold user.userName
      let req = {
        username: "ramaswamy1",
        password: "some random password"
      };
      request(app)
        .post("/api/v1/users/login")
        .send(req)
        .set("Accept", "application/json")
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.user.username.should.be.equal(req.username);
          done();
        });
    });

    //  testcase
    it("Should handle a request to login with wrong password", function(done) {
      //Response body should have a key as message which will hold value as 'Password is incorrect'
      // status code = 403
      // response body will hold an object with message key
      let req = {
        username: "ramaswamy1",
        password: "some random password ert"
      };
      request(app)
        .post("/api/v1/users/login")
        .send(req)
        .set("Accept", "application/json")
        .expect(403)
        .end(function(err, res) {
          if (err) return done(err);
          res.error.text.should.be.equal("Password is incorrect");
          done();
        });
    });

    //  testcase
    it("Should handle a request to login with wrong username", function(done) {
      //Response body should have a key as message which will hold value as 'You are not registered user'
      // status code = 403
      // response body will hold an object with message key
      let req = {
        username: "ramaswamy123",
        password: "some random password"
      };
      request(app)
        .post("/api/v1/users/login")
        .send(req)
        .set("Accept", "application/json")
        .expect(403)
        .end(function(err, res) {
          if (err) return done(err);
          res.error.text.should.be.equal("You are not registered user");
          done();
        });
    });
  });
});
