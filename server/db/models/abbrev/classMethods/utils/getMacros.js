/**
 * @module models/abbrev/classMethods/getMacros
 */

module.exports = getMacros;

/**
 * Calculate the macronutrients of a factor
 * @param {number} gr
 * @param {{p: number, c: number, f: number, weight: number}} factor
 */
function getMacros(gr, factor) {
  return {
    protein: Math.round((gr * factor.p * 10) / factor.weight) / 10,
    carbs: Math.round((gr * factor.c * 10) / factor.weight) / 10,
    fat: Math.round((gr * factor.f * 10) / factor.weight) / 10
  };
}
