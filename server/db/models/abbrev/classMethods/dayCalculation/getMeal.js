module.exports = getMeal;

/**
 * Get a random viable meal
 * @param {Array<mealType>} allMeals
 * @param {{ protein: number, carbs: number, fat: number }} goal
 * @param {number} ix
 * @return {array}
 */
function getMeal(allMeals, goal, ix) {
  if (goal.protein === 0 && goal.carbs === 0 && goal.fat === 0) {
    return null;
  }
  // Calculate quantities to reach goal
  const keys = Object.keys(allMeals[ix]);
  const ln = keys.length;

  let result;
  let randomSelection;
  let meal;
  let ids;
  let calcFoods;

  for (let i = 0; i < 20; i++) {
    randomSelection = Math.floor(Math.random() * ln);
    const mealOpts = Object.keys(allMeals[ix]).map(key => allMeals[ix][key]);

    meal = mealOpts[randomSelection];
    ids = meal.map(record => record.abbrev_id);
    calcFoods = meal;

    result = this.calculateMacros({
      proteinGoal: goal.protein,
      carbGoal: goal.carbs,
      fatGoal: goal.fat
    }, ids, calcFoods);
    if (!result.error) {
      return result;
    }
  }

  return result;
};