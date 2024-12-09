const Abbrev = require('../../abbrev');

module.exports = addFavoriteFood;

/**
 * Add a user favorite for a meal
 * @param {number} userId identifies the user
 * @param {number} abbrevId identifies the food
 * @param {number} meal specifies for which meal to add
 * @return {Promise}
 * @this user
 * @async
 */
async function addFavoriteFood(userId, abbrevId, meal) {
  const user = await this.findById(userId);
  const abbrev = await Abbrev.findById(abbrevId);
  const relation = await user.addAbbrev(abbrev, { meal });
  return Object.assign({}, abbrev.get(), { recordFavorite: relation[0][0] });
}
