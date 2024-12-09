const Abbrev = require('../../abbrev');

module.exports = removeFavoriteFood;

/**
 * Add a user favorite for a meal
 * @param {number} userId identifies the user
 * @param {number} abbrevId identifies the food
 * @param {number} meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function removeFavoriteFood(userId, abbrevId, meal) {
  const user = await this.findById(userId);
  const abbrev = await Abbrev.findById(abbrevId);
  const removed = await user.removeAbbrev(abbrev, { meal });
  return removed;
}
