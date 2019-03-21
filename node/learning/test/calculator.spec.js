const assert = require("chai").assert;
const add = require("../math/add").add;
describe("Calculator Functional testing", function() {
  it("should add two positive numbers", function() {
    assert.strictEqual(
      add(2, 3),
      5,
      "is this the error message to be displayed"
    );
  });
  it("should add two negative numbers", function() {
    assert.strictEqual(
      add(1, -3),
      -2,
      "is this the error message to be displayed"
    );
  });
});
