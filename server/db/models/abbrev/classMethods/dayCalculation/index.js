const appError = require('../../../../../configure/appError')
const filterMeals = require('./filterMeals');
const MealGoals = require('../../../meal-goals');
const getMealUnbound = require('./getMeal');

/** Function to get the meals for a day */
module.exports = dayCalculation;

/**
 * Get the meal for the day based on the user goals and day type
 * @param {number} user_id identifies the user
 * @param {('train'|'rest')} type indicates whether the user will train or rest on that day
 * @return {Promise<Array>}
 */
function dayCalculation(user_id, type) {
  const getMeal = getMealUnbound.bind(this);
  if (type !== 'train' && type !== 'rest') {
    throw new appError(400, '`type` must be \'train\' or \'rest\'', true);
  }
  const out = [];

  let goals;
  let meals;

  return MealGoals.findOne({
    where: {
      user_id
    },
    order: [
      ['createdAt', 'DESC']
    ]
  }).then((_goals) => {
    goals = _goals.goals[type];
    // Get all meals, in correct meal slot return db.FoodRecord.makeHistoricalArray(
    // res.locals.user_id );
  }).then(() => {
    meals = filterMeals(goals);

    // For each slot, choose a meal at random
    for (let ix = 0; ix < goals.length; ix++) {
      out[ix] = getMeal(meals, goals[ix], ix);
    }

    return Promise.all(out);
    // When each meal has calculated quantities, send it back
  }).then((output) => {
    output.forEach((ml, ix) => {
      if (ml && ml.error) {
        out[ix] = getMeal(meals, goals[ix], ix);
      }
    });

    return Promise.all(out);
  });
}
