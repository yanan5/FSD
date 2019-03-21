const should = require("chai").should();
const passUtil = require("../utils");

describe("Testing password hash", function() {
  let pass = "somerandom@23.*&^";
  let wrongPass = "Wsomerandom@23.*&^G";
  let hashedPass;
  it("should hash the original password", function(done) {
    let salt = 10;
    passUtil
      .hashPassword(pass, salt)
      .then(hash => {
        hashedPass = hash;
        pass.should.not.equal(hash);
        done();
      })
      .catch(err => done(err));
  });
  it("should compare the correct password with the hashedPass", function(done) {
    passUtil
      .comparePassword(pass, hashedPass)
      .then(isSame => {
        isSame.should.be.equal(true);
        done();
      })
      .catch(err => done(err));
  });
  it("should compare the wrong password with the hashedPass", function(done) {
    passUtil
      .comparePassword(wrongPass, hashedPass)
      .then(isSame => {
        isSame.should.be.equal(false);
        done();
      })
      .catch(err => done(err));
  });
});
