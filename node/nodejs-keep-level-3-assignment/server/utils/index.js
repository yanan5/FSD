let bcrypt = require("bcryptjs");

module.exports = {
  hashPassword(rawPassword, saltRounds) {
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(rawPassword, salt));
  },
  comparePassword(rawPassword, hashedPassword) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }
};
