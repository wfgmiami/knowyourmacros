const checkFailure = require('./checkFailure');
const getFactors = require('../utils/getFactors');
const filteredMeals = require('../../../../data/filteredmeals');

module.exports = filterMeals;

/**
 * Filter meals based on goals
 * @param {Array<{ protein: number, carbs: number, fat: number }>} goals
 */
function filterMeals(goals) {
  const meals = filteredMeals.slice();
  
  meals.forEach((meal, ix) => {
    Object.keys(meal).forEach((date) => {
      const factors = getFactors(meal[date]);

      // Check for obvious failures
      /** @type {number} */
      const protein = goals[ix].protein;

      /** @type {number} */
      const carbs = goals[ix].carbs;

      /** @type {number} */
      const fat = goals[ix].fat;

      let goalDesc = { main: protein, sub1: carbs, sub2: fat };
      if (checkFailure(goalDesc, factors.pFood, { prim: 'p', sec: 'c', min: 'f' })) {
        delete meal[date];
        return;
      }

      goalDesc = { main: carbs, sub1: protein, sub2: fat };
      if (checkFailure(goalDesc, factors.cFood, { prim: 'c', sec: 'p', min: 'f' })) {
        delete meal[date];
        return;
      }

      goalDesc = { main: fat, sub1: protein, sub2: carbs };
      if (checkFailure(goalDesc, factors.fFood, { prim: 'f', sec: 'p', min: 'c' })) {
        delete meal[date];
        return;
      }

      /** @type {{ p: boolean, c: boolean, f: boolean }} */
      const profile = meal[date].reduce((memo, fd) => {
        memo[fd.maxMacro] = true;
        return memo;
      }, {});

      /** Make sure there are three max macros */
      if (Object.keys(profile).length !== 3) {
        delete meal[date];
      }
    });
  });

  return meals;
}