const { sequelize } = require('../../../../../db');

const carbs = '"abbrev"."Carbohydrates"';
const fat = '"abbrev"."Fat"';
const protein = '"abbrev"."Protein"';

/**
 * Creates the query for protein percent
 * @param {number} percent Percent protein
 * @param {string} comparator < or > or <= or >= or =
 */
function proteinQuery(percent, comparator) {
  return sequelize.where(sequelize.col('abbrev.Protein'), comparator, sequelize.literal(`(((${percent * 4} * ${carbs}) + (${percent * 9} * ${fat}))/ (${4 - (percent * 4)}))`));
}

/**
 * Creates the query for carbs percent
 * @param {number} percent Percent carbs
 * @param {string} comparator < or > or <= or >= or =
 */
function carbQuery(percent, comparator) {
  return sequelize.where(sequelize.col('abbrev.Carbohydrates'), comparator, sequelize.literal(`(((${percent * 4} * ${protein}) + (${percent * 9} * ${fat}))/ (${4 - (percent * 4)}))`));
}

/**
 * Creates the query for fat percent
 * @param {number} percent Percent fat
 * @param {string} comparator < or > or <= or >= or =
 */
function fatQuery(percent, comparator) {
  return sequelize.where(sequelize.col('abbrev.Fat'), comparator, sequelize.literal(`(((${percent * 4} * ${protein}) + (${percent * 4} * ${carbs}))/ (${9 - (percent * 9)}))`));
}

module.exports = {
  proteinQuery,
  carbQuery,
  fatQuery
};
