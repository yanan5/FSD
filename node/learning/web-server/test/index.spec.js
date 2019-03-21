const request = require("supertest");
const assert = require("chai").assert;
const server = require("../index");

describe("Test Suite for bar", () => {
  it("should send us bar for path /bar http request", done => {
    request(server)
      .get("/bar")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "bar", "should return bar");
        done(null);
      });
  });

  it("should send us bar for path /bar POST http request", done => {
    request(server)
      .post("/bar")
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "POST bar", "should return POST bar");
        done(null);
      });
  });
});
describe("Test suite for Foo", () => {
  it("should send us foo for path /foo http request", done => {
    request(server)
      .get("/foo")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "foo", "should return bar");
        done(null);
      });
  });

  it("should send us foo for path /foo/bar http request", done => {
    request(server)
      .get("/foo/bar")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "foo bar", "should return bar");
        done(null);
      });
  });

  it("should send us foo for path /foo POST http request", done => {
    request(server)
      .post("/foo")
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "POST foo", "should return POST foo");
        done(null);
      });
  });

  it("should send us 404 for path not found", done => {
    request(server)
      .patch("/foo")
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "PATCH foo", "should return PATCH foo");
        done(null);
      });
  });
});
describe("Test suite for path not found", () => {
  it("should send us 404 for path not found", done => {
    request(server)
      .patch("/foo/get")
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.text, "Not Found", "should return Not Found");
        done(null);
      });
  });
});
describe("Test suite for parseDate", () => {
  it("it should return the query paramters", done => {
    request(server)
      .get("/parsedate?day=06&month=08&hour=12&minute=10")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(
          res,
          "/parsedate?day=06&month=08&hour=12&minute=10",
          "respone should match"
        );
        done(null);
      });
  });
});
describe("Test suite for dateToString", () => {
  it("it should return August 6, 1991 given /datetostring/06/08/1991", done => {
    request(server)
      .get("/datetostring/06/08/1991")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res, "August, 6, 1991", "respone should match");
        done(null);
      });
  });
  it("it should return August 6, 2019 given /datetostring/06/08", done => {
    request(server)
      .get("/datetostring/06/08")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res, "August 6, 2019", "respone should match");
        done(null);
      });
  });
  it("it should return January, 6, 2019 given /datetostring/06", done => {
    request(server)
      .get("/datetostring/06")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res, "January, 6, 2019", "respone should match");
        done(null);
      });
  });
});
