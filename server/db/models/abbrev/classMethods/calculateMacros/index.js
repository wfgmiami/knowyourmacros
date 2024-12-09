/**
 * @module models/abbrev/classMethods/calculateMacros
 */

const calcWeights = require('../utils/calcWeights');
const getFactors = require('../utils/getFactors');
const getRes = require('./getRes');
const getMax = require('./getMax');

/**
 * Calculate macronutrients
 * @param {{proteinGoal: number, carbGoal: number, fatGoal: number}} goals - Macronutrient goals
 * @param {number} id - food id
 * @param {Array<abbrevType>} [_foods] - array of foods
 * @param {boolean} [sensitive] - prevent huge meals from being returned
 */
function calculateMacros(goals, id, _foods, sensitive) {
  let start;
  const { proteinGoal, carbGoal, fatGoal } = goals;
  if (_foods) {
    start = Promise.resolve(_foods);
  } else {
    start = Promise.all(id.map(ix => this.scope('weight').findById(ix)));
  }

  return start
    .then((startFoods) => {
      const foods = startFoods;
      const oFoods = foods.slice();
      if (proteinGoal <= 0 || carbGoal <= 0 || fatGoal <= 0) {
        return {
          error: 'Goal macronutrients must be greater than 0'
        };
      }

      // Factors
      let factors = getFactors(foods);

      if (!factors.pFood.p) {
        factors = getMax('pFood', 'Protein', factors);
      }
      if (!factors.cFood.c) {
        factors = getMax('cFood', 'Carbohydrates', factors);
      }
      if (!factors.fFood.f) {
        factors = getMax('fFood', 'Fat', factors);
      }

      const { alpha, beta, gamma } = calcWeights(factors, proteinGoal, carbGoal, fatGoal);

      const cG = Math.round(alpha);
      const spG = Math.round(beta);
      const aG = Math.round(gamma);

      if (sensitive && (alpha > 400 || beta > 400 || gamma > 400)) {
        return {
          error: 'These foods require really high quantities to reach your goal',
          result: [
            getRes(cG, factors.pFood),
            getRes(spG, factors.cFood),
            getRes(aG, factors.fFood)
          ]
        };
      }

      if (alpha >= 0 && beta >= 0 && gamma >= 0) {
        return [
          getRes(cG, factors.pFood),
          getRes(spG, factors.cFood),
          getRes(aG, factors.fFood)
        ];
      }
      return {
        error: 'These foods cannot create a meal with your desired macronutrients',
        factors
      };
    });
}

module.exports = calculateMacros;
