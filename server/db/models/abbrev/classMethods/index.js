/**
 * @module models/abbrev/classMethods
 */

const calculateMacros = require('./calculateMacros');
const fpCalculateMacros = require('./fpCalculateMacros');
const dayCalculation = require('./dayCalculation');

/** pass along the classMethods */
module.exports = {
  calculateMacros,
  fpCalculateMacros,
  dayCalculation
};
