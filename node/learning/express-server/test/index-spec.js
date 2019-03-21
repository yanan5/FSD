const request = require("supertest");
const assert = require("chai").assert;
const app = require("../server");

describe("To test basic express app", () => {
  it('should return "Hello Express for path /', done => {
    request(app)
      .get("/api")
      .end((err, res) => {
        if (err) return done(err);
        assert(res, "Hello Express", "pass");
        done(null);
      });
  });
});
