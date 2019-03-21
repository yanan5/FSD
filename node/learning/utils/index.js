const lodash = require("lodash");

module.exports = {
  updateArray: (names, updateNames) => lodash.fill(names, updateNames),
  sequence: (...argsOfFuncs) => (...commonArgs) =>
    argsOfFuncs.reverse().forEach((func, ind) => func(...commonArgs))
};
