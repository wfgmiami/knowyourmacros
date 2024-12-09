/**
 * @module models/abbrev/classMethods/calcWeights
 */

/**
 * @typedef {{weight: number, p: number, c: number, f: number }} factorFoodType
 * @typedef {{pFood: factorFoodType, cFood: factorFoodType, fFood: factorFoodType}} factors
 */

module.exports = calcWeights;

/**
 * Get the proper weight of the foods, in grams, given the goals
 * @param {factors} factors
 * @param {number} pGoal protein goal
 * @param {number} cGoal carb goal
 * @param {number} fGoal fat goal
 */
function calcWeights(factors, pGoal, cGoal, fGoal) {
  // Gram weights of the foods
  let alpha = 30;
  let beta = 30;
  let gamma = 30;

  const { pFood, cFood, fFood } = factors;

  // Gauss-Seidel Iteration
  for (let inc = 0; inc < 20; inc++) {
    alpha = (pFood.weight / pFood.p) * (pGoal - ((cFood.p * beta) / cFood.weight) - ((fFood.p * gamma) / fFood.weight));
    beta = (cFood.weight / cFood.c) * (cGoal - ((pFood.c * alpha) / pFood.weight) - ((fFood.c * gamma) / fFood.weight));
    gamma = (fFood.weight / fFood.f) * (fGoal - ((pFood.f * alpha) / pFood.weight) - ((cFood.f * beta) / cFood.weight));
  }

  return {
    alpha,
    beta,
    gamma
  };
}

