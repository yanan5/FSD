const expect = require("chai").expect;
const { signJWTToken, verifyJWTToken } = require("../modules");
const { secret, expiresIn } = require("../config").appConfig.PASSPORT_CONFIG;
describe("JWT Token test scenarios", function() {
  let tokenData;
  let doc;
  before(function() {
    doc = {
      username: "somerandomUserName",
      _id: "234lkjsdfio32k4lj34rio234"
    };
  });
  after(function(done) {
    done();
  });

  it("Assert signing & verification methods exists and are valid", function() {
    expect(signJWTToken).to.not.equal(undefined);
    expect(signJWTToken).to.not.equal(null);
    expect(typeof signJWTToken).to.equal("function");
    expect(signJWTToken.length).to.be.above(
      0,
      "this method must have arguments"
    );

    expect(verifyJWTToken).to.not.equal(undefined);
    expect(verifyJWTToken).to.not.equal(null);
    expect(typeof verifyJWTToken).to.equal("function");
    expect(verifyJWTToken.length).to.be.above(
      0,
      "this method must have arguments"
    );

    expect(signJWTToken).to.be.an("function");
  });

  it("sign a token with valid payload, signature, secret and expiry time", function(done) {
    signJWTToken({ name: doc.username, id: doc._id }, secret, 50, function(
      err,
      token
    ) {
      if (err) return done(err);
      tokenData = token;
      done();
    });
  });
  it("verification of a valid signed token, must return same payload, which was passed", function(done) {
    verifyJWTToken(tokenData, secret, (err, decode) => {
      if (err) return done(err);
      expect(decode.name).equal(doc.username);
      done();
    });
  });
  it("verification a expired token, must return with appropriate error", function(done) {
    setTimeout(function() {
      verifyJWTToken(tokenData, secret, (err, decode) => {
        if (err) {
          expect(err.message).equal("invalid signature");
          done();
        }
      });
    }, 1000);
  });
  it("verification a invalid, must return with appropriate error", function(done) {
    verifyJWTToken(tokenData + "e", secret, (err, decode) => {
      if (err) {
        expect(err.message).equal("invalid signature");
        done();
      }
    });
  });
});
