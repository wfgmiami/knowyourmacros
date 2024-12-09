const assert = require('assert');
module.exports = makeProgramObject;

/**
 * Create an object to define a program
 * @param {{ units: string, weight: number, user_id: number }} measure
 */
function makeProgramObject(measure) {
  const { units, weight } = measure;
  assert.equal(units, 'imperial' || 'metric', 'Units must be either `imperial` or `metric`');
  const startWeight = weight * 1;
  let endGoal;
  if (units === 'imperial') {
    endGoal = parseFloat(weight) - 5;
  } else {
    endGoal = Math.round((parseFloat(weight) - (5 / 2.2)) * 10) / 10;
  }
  const startDate = new Date();
  const endDate = new Date(new Date().getTime() + (86400000 * 35));

  return {
    startWeight,
    endGoal,
    startDate,
    endDate,
    status: 'In Progress',
    user_id: measure.user_id,
    result: 'TBD'
  };
}